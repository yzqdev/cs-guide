import{_ as t,c as r,o,a as n}from"./app-CbULZrmi.js";const i={},e=n("h1",{id:"java打印彩色文字",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#java打印彩色文字"},[n("span",null,"java打印彩色文字")])],-1),s=n("pre",null,[n("code",{class:"language-java"},`package com.yzq.util;


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
    public static final String RESET = "\\033[0m";

    public static void print(ColorEnum color, String str) {
//\\033[4;36m  cyan underline

        System.out.printf("\\033[%s;%sm%s%s%n", "2", color.code, str, RESET);
    }

    public static void printUnderline(ColorEnum color, String str) {

        System.out.printf("\\033[%s;%sm%s%s%n", "4", color.code, str, RESET);
    }

    public static void printBg(ColorEnum foregroundColor, ColorEnum bgColor, String str) {

        System.out.printf("\\033[%s;%s;%sm%s%s%n", "4", foregroundColor.code, bgColor.code, str, RESET);
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

`)],-1),a=[e,s];function l(c,g){return o(),r("div",null,a)}const u=t(i,[["render",l],["__file","ansi-color.html.vue"]]),d=JSON.parse('{"path":"/java-tutor/java-tips/ansi-color.html","title":"java打印彩色文字","lang":"zh-CN","frontmatter":{"description":"java打印彩色文字","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/java-tutor/java-tips/ansi-color.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"java打印彩色文字"}],["meta",{"property":"og:description","content":"java打印彩色文字"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-06-18T06:54:45.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-06-18T06:54:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java打印彩色文字\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-06-18T06:54:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1655535285000,"updatedTime":1655535285000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":1.36,"words":409},"filePathRelative":"java-tutor/java-tips/ansi-color.md","localizedDate":"2022年6月18日","autoDesc":true}');export{u as comp,d as data};
