# 颜色

<CssDemo :css-list='cssList' :show-font='font'/>

<script setup>

    import { h, ref } from 'vue'
    let cssList= ref([
  {color:'cyan'},
  {color:'#00ff00'},
  {color:'rgb(213,122,125)'},
  {color:'hsl(30,100%,50%)'},
  {color:'hsla(30,100%,50%,.3)'},
  {color:'hwb(1.5708rad 20% 10% / 0.7)'},

])
 let font=ref(true)
</script>
hex显示透明度

例如
`00ff00ff`
 | 0% — 00  | 0% — 00  | 0% — 00  | 0% — 00  |
 | -------- | -------- | -------- | -------- |
 | 0% — 00  | 25% — 40 | 50% — 80 | 75% — BF |
 | 1% — 03  | 26% — 42 | 51% — 82 | 76% — C2 |
 | 2% — 05  | 27% — 45 | 52% — 85 | 77% — C4 |
 | 3% — 08  | 28% — 47 | 53% — 87 | 78% — C7 |
 | 4% — 0A  | 29% — 4A | 54% — 8A | 79% — C9 |
 | 5% — 0D  | 30% — 4D | 55% — 8C | 80% — CC |
 | 6% — 0F  | 31% — 4F | 56% — 8F | 81% — CF |
 | 7% — 12  | 32% — 52 | 57% — 91 | 82% — D1 |
 | 8% — 14  | 33% — 54 | 58% — 94 | 83% — D4 |
 | 9% — 17  | 34% — 57 | 59% — 96 | 84% — D6 |
 | 10% — 1A | 35% — 59 | 60% — 99 | 85% — D9 |
 | 11% — 1C | 36% — 5C | 61% — 9C | 86% — DB |
 | 12% — 1F | 37% — 5E | 62% — 9E | 87% — DE |
 | 13% — 21 | 38% — 61 | 63% — A1 | 88% — E0 |
 | 14% — 24 | 39% — 63 | 64% — A3 | 89% — E3 |
 | 15% — 26 | 40% — 66 | 65% — A6 | 90% — E6 |
 | 16% — 29 | 41% — 69 | 66% — A8 | 91% — E8 |
 | 17% — 2B | 42% — 6B | 67% — AB | 92% — EB |
 | 18% — 2E | 43% — 6E | 68% — AD | 93% — ED |
 | 19% — 30 | 44% — 70 | 69% — B0 | 94% — F0 |
 | 20% — 33 | 45% — 73 | 70% — B3 | 95% — F2 |
 | 21% — 36 | 46% — 75 | 71% — B5 | 96% — F5 |
 | 22% — 38 | 47% — 78 | 72% — B8 | 97% — F7 |
 | 23% — 3B | 48% — 7A | 73% — BA | 98% — FA |
 | 24% — 3D | 49% — 7D | 74% — BD | 99% — FC |
100%是FF

- <https://htmlcolorcodes.com/zh/yanse-xuanze-qi/>
- <https://flatuicolors.com/palette/defo>
- <http://tool.c7sky.com/webcolor/>
- <https://colordrop.io/>
- <https://colors.dopely.top/>
- <https://colordesigner.io/>
- <https://picular.co/>
- <https://colorkit.io/>
