# java打印彩色文字

```java
package com.yzq.util;


enum ColorEnum {

    /**
     * 黑色
     */
    BLACK(30),
    /**
     * 红色
     */
    RED(31),
    /**
     * 绿色
     */
    GREEN(32),
    /**
     * 黄色
     */
    YELLOW(33),
    /**
     * 蓝色
     */
    BLUE(34),
    /**
     * 粉红色
     */
    PINK(35),
    /**
     * 青色
     */
    CYAN(36),
    WHITE(37),


    bgBLACK(40),
    /**
     * 红色
     */
    bgRED(41),
    /**
     * 绿色
     */
    bgGREEN(42),
    /**
     * 黄色
     */
    bgYELLOW(44),
    /**
     * 蓝色
     */
    bgBLUE(44),
    /**
     * 粉红色
     */
    bgPINK(45),
    /**
     * 青色
     */
    bgCYAN(46),
    bgWHITE(47),
    lightRed(91);
    public int code;

    ColorEnum(int code) {
        this.code = code;
    }
}

public class ColorUtil {
    public static final String RESET = "\033[0m";

    public static void print(ColorEnum color, String str) {
//\033[4;36m  cyan underline

        System.out.printf("\033[%s;%sm%s%s%n", "2", color.code, str, RESET);
    }

    public static void printUnderline(ColorEnum color, String str) {

        System.out.printf("\033[%s;%sm%s%s%n", "4", color.code, str, RESET);
    }

    public static void printBg(ColorEnum foregroundColor, ColorEnum bgColor, String str) {

        System.out.printf("\033[%s;%s;%sm%s%s%n", "4", foregroundColor.code, bgColor.code, str, RESET);
    }

    /**
     * 红色
     *
     * @param str  str
     * @param args 是否下划线
     */
    public static void red(String str, String... args) {
        if (args.length > 0) {
            printUnderline(ColorEnum.RED, str);
        } else {
            print(ColorEnum.RED, str);
        }

    }

    public static void green(String str, String... args) {
        if (args.length > 0) {
            printUnderline(ColorEnum.GREEN, str);
        } else {
            print(ColorEnum.GREEN, str);
        }

    }

    public static void yellow(String str, String... args) {
        if (args.length > 0) {
            printUnderline(ColorEnum.YELLOW, str);
        } else {
            print(ColorEnum.YELLOW, str);
        }

    }

    public static void blue(String str, String... args) {
        if (args.length > 0) {
            printUnderline(ColorEnum.BLUE, str);
        } else {
            print(ColorEnum.BLUE, str);
        }

    }


    public static void cyan(String str) {
        print(ColorEnum.CYAN, str);
    }

    public static void cyan(String str, String... args) {
        if (args.length > 0) {
            printUnderline(ColorEnum.CYAN, str);
        }
    }

    public static void pink(String str, String... args) {
        if (args.length > 0) {
            printUnderline(ColorEnum.PINK, str);
        } else {
            print(ColorEnum.PINK, str);
        }

    }

    public static void black(String str, String... args) {
        if (args.length > 0) {
            printUnderline(ColorEnum.BLACK, str);
        } else {
            print(ColorEnum.BLACK, str);
        }

    }


    public static void bgGreen(String str) {
        printBg(ColorEnum.RED, ColorEnum.bgGREEN, str);
    }

    public static void bgRed(String str) {
        printBg(ColorEnum.WHITE, ColorEnum.bgRED, str);
    }

    public static void bgYellow(String str) {
        printBg(ColorEnum.WHITE, ColorEnum.bgYELLOW, str);
    }

    public static void bgBlue(String str) {
        print(ColorEnum.bgBLUE, str);
    }

    public static void bgPink(String str) {
        printBg(ColorEnum.WHITE, ColorEnum.bgPINK, str);
    }

    public static void bgCyan(String str) {
        printBg(ColorEnum.WHITE, ColorEnum.CYAN, str);
    }

    public static void bgWhite(String str) {
        printBg(ColorEnum.WHITE, ColorEnum.bgWHITE, str);
    }

    public static void lightWhite(String str) {
        printBg(ColorEnum.WHITE, ColorEnum.lightRed, str);
    }


}

```
