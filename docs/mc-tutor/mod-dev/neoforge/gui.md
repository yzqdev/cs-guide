# NeoForge 自定义界面

[官方文档](https://docs.neoforged.net/docs/gui/)

## 容器 GUI（Chest GUI）

### 定义容器菜单

```java
// ModMenuTypes.java
public class ModMenuTypes {
    public static final DeferredRegister<MenuType<?>> MENUS =
        DeferredRegister.create(Registries.MENU, MyMod.MODID);

    public static final DeferredHolder<MenuType<?>, MenuType<RubyFurnaceMenu>> RUBY_FURNACE_MENU =
        MENUS.register("ruby_furnace",
            () -> new MenuType<>(RubyFurnaceMenu::new));

    public static void register(IEventBus bus) {
        MENUS.register(bus);
    }
}

// RubyFurnaceMenu.java
public class RubyFurnaceMenu extends AbstractContainerMenu {
    private final Container data;
    private final BlockPos pos;

    // 客户端构造
    public RubyFurnaceMenu(int containerId, Inventory inv) {
        this(containerId, inv, new SimpleContainer(3), BlockPos.ZERO);
    }

    // 服务器构造
    public RubyFurnaceMenu(int containerId, Inventory inv, 
                           Container container, BlockPos pos) {
        super(ModMenuTypes.RUBY_FURNACE_MENU.get(), containerId);
        this.data = container;
        this.pos = pos;

        // 输入槽
        this.addSlot(new Slot(container, 0, 56, 17));
        // 燃料槽
        this.addSlot(new Slot(container, 1, 56, 53));
        // 输出槽（只读）
        this.addSlot(new FurnaceResultSlot(inv.player, container, 2, 116, 35));

        // 玩家背包
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 9; j++) {
                this.addSlot(new Slot(inv, j + i * 9 + 9, 8 + j * 18, 84 + i * 18));
            }
        }
        // 快捷栏
        for (int k = 0; k < 9; k++) {
            this.addSlot(new Slot(inv, k, 8 + k * 18, 142));
        }
    }

    @Override
    public ItemStack quickMoveStack(Player player, int index) {
        Slot slot = this.slots.get(index);
        if (!slot.hasItem()) return ItemStack.EMPTY;

        ItemStack stack = slot.getItem();
        ItemStack copy = stack.copy();

        if (index < 3) {
            // 从容器移到背包
            if (!this.moveItemStackTo(stack, 3, 39, true))
                return ItemStack.EMPTY;
        } else {
            // 从背包移到容器
            if (!this.moveItemStackTo(stack, 0, 2, false))
                return ItemStack.EMPTY;
        }

        if (stack.isEmpty()) {
            slot.set(ItemStack.EMPTY);
        } else {
            slot.setChanged();
        }

        return copy;
    }

    @Override
    public boolean stillValid(Player player) {
        return stillValid(ContainerLevelAccess.create(
            player.level(), pos), player, ModBlocks.RUBY_FURNACE.get());
    }

    public BlockPos getPos() { return pos; }
}
```

### 定义容器方块

```java
// RubyFurnaceBlock.java
public class RubyFurnaceBlock extends BaseEntityBlock {
    public RubyFurnaceBlock(Properties properties) {
        super(properties);
    }

    @Override
    public InteractionResult use(BlockState state, Level level, BlockPos pos,
                                  Player player, InteractionHand hand, BlockHitResult hit) {
        if (level.isClientSide) {
            return InteractionResult.sidedSuccess(true);
        }

        BlockEntity be = level.getBlockEntity(pos);
        if (be instanceof RubyFurnaceBE furnace) {
            player.openMenu(new SimpleMenuProvider(
                (id, inv, p) -> new RubyFurnaceMenu(id, inv, 
                    furnace.getContainer(), pos),
                Component.translatable("container.mymod.ruby_furnace")
            ));
        }
        return InteractionResult.sidedSuccess(false);
    }

    @Override
    public BlockEntity newBlockEntity(BlockPos pos, BlockState state) {
        return new RubyFurnaceBE(pos, state);
    }
}
```

### 容器方块实体

```java
// RubyFurnaceBE.java
public class RubyFurnaceBE extends BlockEntity {
    private final SimpleContainer container = new SimpleContainer(3);

    public RubyFurnaceBE(BlockPos pos, BlockState state) {
        super(ModBlockEntities.RUBY_FURNACE.get(), pos, state);
    }

    public Container getContainer() { return container; }
}
```

## 客户端 GUI 屏幕

### 定义 Screen

```java
// RubyFurnaceScreen.java
public class RubyFurnaceScreen extends AbstractContainerScreen<RubyFurnaceMenu> {
    private static final ResourceLocation GUI_TEXTURE = 
        ResourceLocation.fromNamespaceAndPath(MyMod.MODID, 
            "textures/gui/ruby_furnace.png");

    public RubyFurnaceScreen(RubyFurnaceMenu menu, Inventory inv, 
                              Component title) {
        super(menu, inv, title);
        this.imageWidth = 176;
        this.imageHeight = 166;
    }

    @Override
    protected void renderBg(GuiGraphics graphics, float partialTick, 
                             int mouseX, int mouseY) {
        int x = (this.width - this.imageWidth) / 2;
        int y = (this.height - this.imageHeight) / 2;

        // 绘制背景
        graphics.blit(GUI_TEXTURE, x, y, 0, 0, 
            this.imageWidth, this.imageHeight);

        // 绘制进度条（可选的动画效果）
        // int progress = getMenu().getProgress();
        // graphics.blit(GUI_TEXTURE, x + 79, y + 35, 176, 0, progress + 1, 16);
    }

    @Override
    public void render(GuiGraphics graphics, int mouseX, int mouseY, 
                       float partialTick) {
        this.renderBackground(graphics, mouseX, mouseY, partialTick);
        super.render(graphics, mouseX, mouseY, partialTick);
        this.renderTooltip(graphics, mouseX, mouseY);
    }
}

// 注册 Screen
@Mod.EventBusSubscriber(modid = MyMod.MODID, value = Dist.CLIENT, 
                         bus = Mod.EventBusSubscriber.Bus.MOD)
public class ModScreenEvents {
    @SubscribeEvent
    public static void onRegisterScreens(MenuTypeScreenExtensionEvent event) {
        event.getExtensions().put(
            ModMenuTypes.RUBY_FURNACE_MENU.get(),
            (MenuScreensExtension) (menu, inv, title) -> 
                new RubyFurnaceScreen(menu, inv, title)
        );
    }
}
```

## 覆盖层（Overlay）

```java
// 自定义 HUD 覆盖层
public class RubyHudOverlay {
    private static final ResourceLocation HUD_TEXTURE = 
        ResourceLocation.fromNamespaceAndPath(MyMod.MODID, 
            "textures/gui/ruby_hud.png");

    @SubscribeEvent
    public static void onRenderOverlay(RenderGuiOverlayEvent event) {
        Player player = Minecraft.getInstance().player;
        if (player == null) return;

        GuiGraphics graphics = event.getGuiGraphics();
        int x = 10;
        int y = 10;

        // 绘制自定义 HUD 元素
        graphics.drawString(Minecraft.getInstance().font,
            "Ruby: " + countRubyInInventory(player), 
            x, y, 0xFF4444, true);

        // 绘制图标纹理
        graphics.blit(HUD_TEXTURE, x, y + 10, 0, 0, 16, 16, 16, 16);
    }

    private static int countRubyInInventory(Player player) {
        return player.getInventory().items.stream()
            .filter(item -> item.is(ModItems.RUBY.get()))
            .mapToInt(ItemStack::getCount)
            .sum();
    }
}
```

## 物品渲染（BER）

### BlockEntityRenderer（方块实体渲染）

```java
// RubyChestRenderer.java
public class RubyChestRenderer implements BlockEntityRenderer<RubyChestBE> {
    public RubyChestRenderer(BlockEntityRendererProvider.Context context) {
    }

    @Override
    public void render(RubyChestBE be, float partialTick, 
                        PoseStack poseStack, MultiBufferSource buffer,
                        int packedLight, int packedOverlay) {
        // 渲染方块实体（例如：显示存储的物品）
        poseStack.pushPose();
        
        ItemStack storedItem = be.getStoredItem();
        if (!storedItem.isEmpty()) {
            Minecraft.getInstance().getItemRenderer()
                .renderStatic(storedItem, ItemDisplayContext.GROUND,
                    packedLight, packedOverlay, poseStack, buffer, 
                    be.getLevel(), 0);
        }

        poseStack.popPose();
    }
}

// 注册
@SubscribeEvent
public static void onRegisterBER(EntityRenderersEvent.RegisterRenderers event) {
    event.registerBlockEntityRenderer(ModBlockEntities.RUBY_CHEST.get(),
        RubyChestRenderer::new);
}
```

## 进阶：自定义渲染类型

```java
// 自定义渲染类型
public class ModRenderTypes {
    public static final RenderType RUBY_BLOCK = RenderType.create(
        "ruby_block",
        RenderType.translucent().format(),
        VertexBuffer.Mode.QUADS,
        256,
        true,
        false,
        RenderType.CompositeState.builder()
            .setShaderState(RenderStateShard.RENDERTYPE_TRANSLUCENT_SHADER)
            .setTextureState(new RenderStateShard.TextureStateShard(
                ResourceLocation.fromNamespaceAndPath(MyMod.MODID, 
                    "textures/block/ruby_block.png"),
                false, false))
            .setTransparencyState(RenderStateShard.TRANSLUCENT_TRANSPARENCY)
            .setLightmapState(RenderStateShard.LIGHTMAP)
            .createCompositeState(true)
    );
}
```
