<style lang="scss" scoped>
table{
  td{
    border:1px solid #666;
    padding: 0.2rem 0.4rem;
  }
}
</style>
<template>
 
  <table>
<tr v-for="item in tableData">
  <td :style="{background:item[3],width:'100px'}"> </td>
  <td v-for="td in item">{{td}}</td>
  <td :style="{background:item[7],width:'100px'}"></td>
</tr>
  </table>
</template>

<script setup lang="ts">
 import {ref} from 'vue'
let tableData=ref([
  [
    "实色效果",
    "英文名称",
    "R.G.B",
    "16进制",
    "实色效果",
    "英文名称",
    "R.G.B",
    "16进制"
  ],
  [
    "雪白",
    "Snow",
    "255 250 250",
    "#FFFAFA",
    "",
    "PaleTurquoise1",
    "187 255 255",
    "#BBFFFF"
  ],
  [
    "幽灵白",
    "GhostWhite",
    "248 248 255",
    "#F8F8FF",
    "",
    "PaleTurquoise2",
    "174 238 238",
    "#AEEEEE"
  ],
  [
    "白烟",
    "WhiteSmoke",
    "245 245 245",
    "#F5F5F5",
    "",
    "PaleTurquoise3",
    "150 205 205",
    "#96CDCD"
  ],
  [
    "淡灰色(庚斯博罗灰)",
    "Gainsboro",
    "220 220 220",
    "#DCDCDC",
    "",
    "PaleTurquoise4",
    "102 139 139",
    "#668B8B"
  ],
  [
    "花白",
    "FloralWhite",
    "255 250 240",
    "#FFFAF0",
    "",
    "CadetBlue1",
    "152 245 255",
    "#98F5FF"
  ],
  [
    "老花色(旧蕾丝)",
    "OldLace",
    "253 245 230",
    "#FDF5E6",
    "",
    "CadetBlue2",
    "142 229 238",
    "#8EE5EE"
  ],
  [
    "亚麻色",
    "Linen",
    "250 240 230",
    "#FAF0E6",
    "",
    "CadetBlue3",
    "122 197 205",
    "#7AC5CD"
  ],
  [
    "古董白",
    "AntiqueWhite",
    "250 235 215",
    "#FAEBD7",
    "",
    "CadetBlue4",
    "83 134 139",
    "#53868B"
  ],
  [
    "番木色(番木瓜)",
    "PapayaWhip",
    "255 239 213",
    "#FFEFD5",
    "",
    "Turquoise1",
    "0 245 255",
    "#00F5FF"
  ],
  [
    "白杏色",
    "BlanchedAlmond",
    "255 235 205",
    "#FFEBCD",
    "",
    "Turquoise2",
    "0 229 238",
    "#00E5EE"
  ],
  [
    "陶坯黄",
    "Bisque",
    "255 228 196",
    "#FFE4C4",
    "",
    "Turquoise3",
    "0 197 205",
    "#00C5CD"
  ],
  [
    "桃肉色",
    "PeachPuff",
    "255 218 185",
    "#FFDAB9",
    "",
    "Turquoise4",
    "0 134 139",
    "#00868B"
  ],
  [
    "纳瓦白(土著白)",
    "NavajoWhite",
    "255 222 173",
    "#FFDEAD",
    "青色",
    "Aqua",
    "0 255 255",
    "#00FFFF"
  ],
  [
    "鹿皮色(鹿皮靴)",
    "Moccasin",
    "255 228 181",
    "#FFE4B5",
    "",
    "Cyan2",
    "0 238 238",
    "#00EEEE"
  ],
  [
    "玉米丝色",
    "Cornsilk",
    "255 248 220",
    "#FFF8DC",
    "",
    "Cyan3",
    "0 205 205",
    "#00CDCD"
  ],
  [
    "象牙色",
    "Ivory",
    "255 255 240",
    "#FFFFF0",
    "暗青色",
    "DarkCyan",
    "0 139 139",
    "#008B8B"
  ],
  [
    "柠檬绸",
    "LemonChiffon",
    "255 250 205",
    "#FFFACD",
    "",
    "DarkSlateGray1",
    "151 255 255",
    "#97FFFF"
  ],
  [
    "海贝壳色",
    "Seashell",
    "255 245 238",
    "#FFF5EE",
    "",
    "DarkSlateGray2",
    "141 238 238",
    "#8DEEEE"
  ],
  [
    "蜜露橙",
    "Honeydew",
    "240 255 240",
    "#F0FFF0",
    "",
    "DarkSlateGray3",
    "121 205 205",
    "#79CDCD"
  ],
  [
    "薄荷奶油",
    "MintCream",
    "245 255 250",
    "#F5FFFA",
    "",
    "DarkSlateGray4",
    "82 139 139",
    "#528B8B"
  ],
  [
    "天蓝色",
    "Azure",
    "240 255 255",
    "#F0FFFF",
    "碧绿色",
    "Aquamarine",
    "127 255 212",
    "#7FFFD4"
  ],
  [
    "爱丽丝蓝",
    "AliceBlue",
    "240 248 255",
    "#F0F8FF",
    "",
    "Aquamarine2",
    "118 238 198",
    "#76EEC6"
  ],
  [
    "淡紫色(熏衣草淡紫)",
    "Lavender",
    "230 230 250",
    "#E6E6FA",
    "中宝石碧绿",
    "MediumAquamarine",
    "102 205 170",
    "#66CDAA"
  ],
  [
    "淡紫红",
    "LavenderBlush",
    "255 240 245",
    "#FFF0F5",
    "",
    "Aquamarine4",
    "69 139 116",
    "#458B74"
  ],
  [
    "浅玫瑰色(薄雾玫瑰)",
    "MistyRose",
    "255 228 225",
    "#FFE4E1",
    "",
    "DarkSeaGreen1",
    "193 255 193",
    "#C1FFC1"
  ],
  [
    "白色",
    "White",
    "255 255 255",
    "#FFFFFF",
    "",
    "DarkSeaGreen2",
    "180 238 180",
    "#B4EEB4"
  ],
  [
    "黑色",
    "Black",
    "0 0 0",
    "#000000",
    "",
    "DarkSeaGreen3",
    "155 205 155",
    "#9BCD9B"
  ],
  [
    "暗瓦灰色(暗石板灰)",
    "DarkSlateGray",
    "47 79 79",
    "#2F4F4F",
    "",
    "DarkSeaGreen4",
    "105 139 105",
    "#698B69"
  ],
  [
    "暗淡的灰色",
    "DimGray",
    "105 105 105",
    "#696969",
    "",
    "SeaGreen1",
    "84 255 159",
    "#54FF9F"
  ],
  [
    "灰石色(石板灰)",
    "SlateGray",
    "112 128 144",
    "#708090",
    "",
    "SeaGreen2",
    "78 238 148",
    "#4EEE94"
  ],
  [
    "亮蓝灰(亮石板灰)",
    "LightSlateGray",
    "119 136 153",
    "#778899",
    "",
    "SeaGreen3",
    "67 205 128",
    "#43CD80"
  ],
  [
    "",
    "Grey",
    "190 190 190",
    "#BEBEBE",
    "海绿色",
    "SeaGreen",
    "46 139 87",
    "#2E8B57"
  ],
  [
    "浅灰色",
    "LightGrey",
    "211 211 211",
    "#D3D3D3",
    "",
    "PaleGreen1",
    "154 255 154",
    "#9AFF9A"
  ],
  [
    "深蓝色",
    "MidnightBlue",
    "25 25 112",
    "#191970",
    "淡绿色",
    "LightGreen",
    "144 238 144",
    "#90EE90"
  ],
  [
    "海军蓝",
    "Navy",
    "0 0 128",
    "#000080",
    "",
    "PaleGreen3",
    "124 205 124",
    "#7CCD7C"
  ],
  [
    "矢车菊蓝",
    "CornflowerBlue",
    "100 149 237",
    "#6495ED",
    "",
    "PaleGreen4",
    "84 139 84",
    "#548B54"
  ],
  [
    "暗灰蓝色(暗板岩蓝)",
    "DarkSlateBlue",
    "72 61 139",
    "#483D8B",
    "嫩绿色",
    "SpringGreen",
    "0 255 127",
    "#00FF7F"
  ],
  [
    "石板蓝",
    "SlateBlue",
    "106 90 205",
    "#6A5ACD",
    "",
    "SpringGreen2",
    "0 238 118",
    "#00EE76"
  ],
  [
    "中暗蓝色(中板岩蓝)",
    "MediumSlateBlue",
    "123 104 238",
    "#7B68EE",
    "",
    "SpringGreen3",
    "0 205 102",
    "#00CD66"
  ],
  [
    "",
    "LightSlateBlue",
    "132 112 255",
    "#8470FF",
    "",
    "SpringGreen4",
    "0 139 69",
    "#008B45"
  ],
  [
    "中蓝色",
    "MediumBlue",
    "0 0 205",
    "#0000CD",
    "绿色",
    "Lime",
    "0 255 0",
    "#00FF00"
  ],
  [
    "品蓝",
    "RoyalBlue",
    "65 105 225",
    "#4169E1",
    "",
    "Green2",
    "0 238 0",
    "#00EE00"
  ],
  [
    "蓝色",
    "Blue",
    "0 0 255",
    "#0000FF",
    "",
    "Green3",
    "0 205 0",
    "#00CD00"
  ],
  [
    "闪兰色(道奇蓝)",
    "DodgerBlue",
    "30 144 255",
    "#1E90FF",
    "",
    "Green4",
    "0 139 0",
    "#008B00"
  ],
  [
    "深天蓝",
    "DeepSkyBlue",
    "0 191 255",
    "#00BFFF",
    "黄绿色",
    "Chartreuse",
    "127 255 0",
    "#7FFF00"
  ],
  [
    "天蓝",
    "SkyBlue",
    "135 206 235",
    "#87CEEB",
    "",
    "Chartreuse2",
    "118 238 0",
    "#76EE00"
  ],
  [
    "亮天蓝色",
    "LightSkyBlue",
    "135 206 250",
    "#87CEFA",
    "",
    "Chartreuse3",
    "102 205 0",
    "#66CD00"
  ],
  [
    "钢蓝/铁青",
    "SteelBlue",
    "70 130 180",
    "#4682B4",
    "",
    "Chartreuse4",
    "69 139 0",
    "#458B00"
  ],
  [
    "亮钢蓝",
    "LightSteelBlue",
    "176 196 222",
    "#B0C4DE",
    "",
    "OliveDrab1",
    "192 255 62",
    "#C0FF3E"
  ],
  [
    "亮蓝",
    "LightBlue",
    "173 216 230",
    "#ADD8E6",
    "",
    "OliveDrab2",
    "179 238 58",
    "#B3EE3A"
  ],
  [
    "浅灰蓝色",
    "PowderBlue",
    "176 224 230",
    "#B0E0E6",
    "黄绿色",
    "YellowGreen",
    "154 205 50",
    "#9ACD32"
  ],
  [
    "弱绿宝石",
    "PaleTurquoise",
    "175 238 238",
    "#AFEEEE",
    "",
    "OliveDrab4",
    "105 139 34",
    "#698B22"
  ],
  [
    "暗绿宝石",
    "DarkTurquoise",
    "0 206 209",
    "#00CED1",
    "",
    "DarkOliveGreen1",
    "202 255 112",
    "#CAFF70"
  ],
  [
    "中绿宝石",
    "MediumTurquoise",
    "72 209 204",
    "#48D1CC",
    "",
    "DarkOliveGreen2",
    "188 238 104",
    "#BCEE68"
  ],
  [
    "青绿色",
    "Turquoise",
    "64 224 208",
    "#40E0D0",
    "",
    "DarkOliveGreen3",
    "162 205 90",
    "#A2CD5A"
  ],
  [
    "青色",
    "Aqua",
    "0 255 255",
    "#00FFFF",
    "",
    "DarkOliveGreen4",
    "110 139 61",
    "#6E8B3D"
  ],
  [
    "淡青色",
    "LightCyan",
    "224 255 255",
    "#E0FFFF",
    "",
    "Khaki1",
    "255 246 143",
    "#FFF68F"
  ],
  [
    "军兰色(军服蓝)",
    "CadetBlue",
    "95 158 160",
    "#5F9EA0",
    "",
    "Khaki2",
    "238 230 133",
    "#EEE685"
  ],
  [
    "中宝石碧绿",
    "MediumAquamarine",
    "102 205 170",
    "#66CDAA",
    "",
    "Khaki3",
    "205 198 115",
    "#CDC673"
  ],
  [
    "碧绿色",
    "Aquamarine",
    "127 255 212",
    "#7FFFD4",
    "",
    "Khaki4",
    "139 134 78",
    "#8B864E"
  ],
  [
    "暗绿色",
    "DarkGreen",
    "0 100 0",
    "#006400",
    "",
    "LightGoldenrod1",
    "255 236 139",
    "#FFEC8B"
  ],
  [
    "暗橄榄绿",
    "DarkOliveGreen",
    "85 107 47",
    "#556B2F",
    "",
    "LightGoldenrod2",
    "238 220 130",
    "#EEDC82"
  ],
  [
    "暗海洋绿",
    "DarkSeaGreen",
    "143 188 143",
    "#8FBC8F",
    "",
    "LightGoldenrod3",
    "205 190 112",
    "#CDBE70"
  ],
  [
    "海绿色",
    "SeaGreen",
    "46 139 87",
    "#2E8B57",
    "",
    "LightGoldenrod4",
    "139 129 76",
    "#8B814C"
  ],
  [
    "中海洋绿",
    "MediumSeaGreen",
    "60 179 113",
    "#3CB371",
    "浅黄色",
    "LightYellow",
    "255 255 224",
    "#FFFFE0"
  ],
  [
    "浅海洋绿",
    "LightSeaGreen",
    "32 178 170",
    "#20B2AA",
    "",
    "LightYellow2",
    "238 238 209",
    "#EEEED1"
  ],
  [
    "弱绿色",
    "PaleGreen",
    "152 251 152",
    "#98FB98",
    "",
    "LightYellow3",
    "205 205 180",
    "#CDCDB4"
  ],
  [
    "嫩绿色",
    "SpringGreen",
    "0 255 127",
    "#00FF7F",
    "",
    "LightYellow4",
    "139 139 122",
    "#8B8B7A"
  ],
  [
    "草地绿",
    "LawnGreen",
    "124 252 0",
    "#7CFC00",
    "黄色",
    "Yellow",
    "255 255 0",
    "#FFFF00"
  ],
  [
    "绿色",
    "Lime",
    "0 255 0",
    "#00FF00",
    "",
    "Yellow2",
    "238 238 0",
    "#EEEE00"
  ],
  [
    "黄绿色",
    "Chartreuse",
    "127 255 0",
    "#7FFF00",
    "",
    "Yellow3",
    "205 205 0",
    "#CDCD00"
  ],
  [
    "中春绿色",
    "MediumSpringGreen",
    "0 250 154",
    "#00FA9A",
    "",
    "Yellow4",
    "139 139 0",
    "#8B8B00"
  ],
  [
    "绿黄色",
    "GreenYellow",
    "173 255 47",
    "#ADFF2F",
    "金黄色",
    "Gold",
    "255 215 0",
    "#FFD700"
  ],
  [
    "酸橙绿",
    "LimeGreen",
    "50 205 50",
    "#32CD32",
    "",
    "Gold2",
    "238 201 0",
    "#EEC900"
  ],
  [
    "黄绿色",
    "YellowGreen",
    "154 205 50",
    "#9ACD32",
    "",
    "Gold3",
    "205 173 0",
    "#CDAD00"
  ],
  [
    "森林绿",
    "ForestGreen",
    "34 139 34",
    "#228B22",
    "",
    "Gold4",
    "139 117 0",
    "#8B7500"
  ],
  [
    "草绿色",
    "OliveDrab",
    "107 142 35",
    "#6B8E23",
    "",
    "Goldenrod1",
    "255 193 37",
    "#FFC125"
  ],
  [
    "暗黄褐色(深卡叽布)",
    "DarkKhaki",
    "189 183 107",
    "#BDB76B",
    "",
    "Goldenrod2",
    "238 180 34",
    "#EEB422"
  ],
  [
    "灰菊黄(苍麒麟色)",
    "PaleGoldenrod",
    "238 232 170",
    "#EEE8AA",
    "",
    "Goldenrod3",
    "205 155 29",
    "#CD9B1D"
  ],
  [
    "亮菊黄",
    "LightGoldenrodYellow",
    "250 250 210",
    "#FAFAD2",
    "",
    "Goldenrod4",
    "139 105 20",
    "#8B6914"
  ],
  [
    "浅黄色",
    "LightYellow",
    "255 255 224",
    "#FFFFE0",
    "",
    "DarkGoldenrod1",
    "255 185 15",
    "#FFB90F"
  ],
  [
    "黄色",
    "Yellow",
    "255 255 0",
    "#FFFF00",
    "",
    "DarkGoldenrod2",
    "238 173 14",
    "#EEAD0E"
  ],
  [
    "金黄色",
    "Gold",
    "255 215 0",
    "#FFD700",
    "",
    "DarkGoldenrod3",
    "205 149 12",
    "#CD950C"
  ],
  [
    "",
    "LightGoldenrod",
    "238 221 130",
    "#EEDD82",
    "",
    "DarkGoldenrod4",
    "139 101 8",
    "#8B658B"
  ],
  [
    "金菊黄",
    "Goldenrod",
    "218 165 32",
    "#DAA520",
    "",
    "RosyBrown1",
    "255 193 193",
    "#FFC1C1"
  ],
  [
    "暗金菊黄",
    "DarkGoldenrod",
    "184 134 11",
    "#B8860B",
    "",
    "RosyBrown2",
    "238 180 180",
    "#EEB4B4"
  ],
  [
    "玫瑰红",
    "RosyBrown",
    "188 143 143",
    "#BC8F8F",
    "",
    "RosyBrown3",
    "205 155 155",
    "#CD9B9B"
  ],
  [
    "印度红",
    "IndianRed",
    "205 92 92",
    "#CD5C5C",
    "",
    "RosyBrown4",
    "139 105 105",
    "#8B6969"
  ],
  [
    "马棕色",
    "SaddleBrown",
    "139 69 19",
    "#8B4513",
    "",
    "IndianRed1",
    "255 106 106",
    "#FF6A6A"
  ],
  [
    "赫色",
    "Sienna",
    "160 82 45",
    "#A0522D",
    "",
    "IndianRed2",
    "238 99 99",
    "#EE6363"
  ],
  [
    "秘鲁色",
    "Peru",
    "205 133 63",
    "#CD853F",
    "",
    "IndianRed3",
    "205 85 85",
    "#CD5555"
  ],
  [
    "硬木色",
    "BurlyWood",
    "222 184 135",
    "#DEB887",
    "",
    "IndianRed4",
    "139 58 58",
    "#8B3A3A"
  ],
  [
    "米色/灰棕色",
    "Beige",
    "245 245 220",
    "#F5F5DC",
    "",
    "Sienna1",
    "255 130 71",
    "#FF8247"
  ],
  [
    "淡黄色",
    "Wheat",
    "245 222 179",
    "#F5DEB3",
    "",
    "Sienna2",
    "238 121 66",
    "#EE7942"
  ],
  [
    "沙棕色",
    "SandyBrown",
    "244 164 96",
    "#F4A460",
    "",
    "Sienna3",
    "205 104 57",
    "#CD6839"
  ],
  [
    "棕褐色",
    "Tan",
    "210 180 140",
    "#D2B48C",
    "",
    "Sienna4",
    "139 71 38",
    "#8B4726"
  ],
  [
    "巧克力色",
    "Chocolate",
    "210 105 30",
    "#D2691E",
    "",
    "Burlywood1",
    "255 211 155",
    "#FFD39B"
  ],
  [
    "耐火砖红",
    "FireBrick",
    "178 34 34",
    "#B22222",
    "",
    "Burlywood2",
    "238 197 145",
    "#EEC591"
  ],
  [
    "棕色",
    "Brown",
    "165 42 42",
    "#A52A2A",
    "",
    "Burlywood3",
    "205 170 125",
    "#CDAA7D"
  ],
  [
    "深鲜肉/鲑鱼色",
    "DarkSalmon",
    "233 150 122",
    "#E9967A",
    "",
    "Burlywood4",
    "139 115 85",
    "#8B7355"
  ],
  [
    "橙红色",
    "Salmon",
    "250 128 114",
    "#FA8072",
    "",
    "Wheat1",
    "255 231 186",
    "#FFE7BA"
  ],
  [
    "浅鲑鱼肉色",
    "LightSalmon",
    "255 160 122",
    "#FFA07A",
    "",
    "Wheat2",
    "238 216 174",
    "#EED8AE"
  ],
  [
    "橙色",
    "Orange",
    "255 165 0",
    "#FFA500",
    "",
    "Wheat3",
    "205 186 150",
    "#CDBA96"
  ],
  [
    "深橙色",
    "DarkOrange",
    "255 140 0",
    "#FF8C00",
    "",
    "Wheat4",
    "139 126 102",
    "#8B7E66"
  ],
  [
    "珊瑚色",
    "Coral",
    "255 127 80",
    "#FF7F50",
    "",
    "Tan1",
    "255 165 79",
    "#FFA54F"
  ],
  [
    "淡珊瑚色",
    "LightCoral",
    "240 128 128",
    "#F08080",
    "",
    "Tan2",
    "238 154 73",
    "#EE9A49"
  ],
  [
    "蕃茄红",
    "Tomato",
    "255 99 71",
    "#FF6347",
    "秘鲁色",
    "Peru",
    "205 133 63",
    "#CD853F"
  ],
  [
    "桔红",
    "OrangeRed",
    "255 69 0",
    "#FF4500",
    "",
    "Tan4",
    "139 90 43",
    "#8B5A2B"
  ],
  [
    "红色",
    "Red",
    "255 0 0",
    "#FF0000",
    "",
    "Chocolate1",
    "255 127 36",
    "#FF7F24"
  ],
  [
    "热情的粉红",
    "HotPink",
    "255 105 180",
    "#FF69B4",
    "",
    "Chocolate2",
    "238 118 33",
    "#EE7621"
  ],
  [
    "深粉红",
    "DeepPink",
    "255 20 147",
    "#FF1493",
    "",
    "Chocolate3",
    "205 102 29",
    "#CD661D"
  ],
  [
    "粉红",
    "Pink",
    "255 192 203",
    "#FFC0CB",
    "马棕色",
    "SaddleBrown",
    "139 69 19",
    "#8B4513"
  ],
  [
    "浅粉红",
    "LightPink",
    "255 182 193",
    "#FFB6C1",
    "",
    "Firebrick1",
    "255 48 48",
    "#FF3030"
  ],
  [
    "弱紫罗兰红",
    "PaleVioletRed",
    "219 112 147",
    "#DB7093",
    "",
    "Firebrick2",
    "238 44 44",
    "#EE2C2C"
  ],
  [
    "栗色",
    "Maroon",
    "176 48 96",
    "#B03060",
    "",
    "Firebrick3",
    "205 38 38",
    "#CD2626"
  ],
  [
    "中紫罗兰红",
    "MediumVioletRed",
    "199 21 133",
    "#C71585",
    "",
    "Firebrick4",
    "139 26 26",
    "#8B1A1A"
  ],
  [
    "",
    "VioletRed",
    "208 32 144",
    "#D02090",
    "",
    "Brown1",
    "255 64 64",
    "#FF4040"
  ],
  [
    "深红色",
    "Fuchsia",
    "255 0 255",
    "#FF00FF",
    "",
    "Brown2",
    "238 59 59",
    "#EE3B3B"
  ],
  [
    "紫罗兰",
    "Violet",
    "238 130 238",
    "#EE82EE",
    "",
    "Brown3",
    "205 51 51",
    "#CD3333"
  ],
  [
    "梅红色",
    "Plum",
    "221 160 221",
    "#DDA0DD",
    "",
    "Brown4",
    "139 35 35",
    "#8B2323"
  ],
  [
    "淡紫色",
    "Orchid",
    "218 112 214",
    "#DA70D6",
    "",
    "Salmon1",
    "255 140 105",
    "#FF8C69"
  ],
  [
    "中兰花紫",
    "MediumOrchid",
    "186 85 211",
    "#BA55D3",
    "",
    "Salmon2",
    "238 130 98",
    "#EE8262"
  ],
  [
    "暗兰花紫",
    "DarkOrchid",
    "153 50 204",
    "#9932CC",
    "",
    "Salmon3",
    "205 112 84",
    "#CD7054"
  ],
  [
    "暗紫罗兰",
    "DarkViolet",
    "148 0 211",
    "#9400D3",
    "",
    "Salmon4",
    "139 76 57",
    "#8B4C39"
  ],
  [
    "紫罗蓝色",
    "BlueViolet",
    "138 43 226",
    "#8A2BE2",
    "浅鲑鱼肉色",
    "LightSalmon",
    "255 160 122",
    "#FFA07A"
  ],
  [
    "紫色",
    "Purple",
    "160 32 240",
    "#A020F0",
    "",
    "LightSalmon2",
    "238 149 114",
    "#EE9572"
  ],
  [
    "中紫色",
    "MediumPurple",
    "147 112 219",
    "#9370DB",
    "",
    "LightSalmon3",
    "205 129 98",
    "#CD8162"
  ],
  [
    "蓟色",
    "Thistle",
    "216 191 216",
    "#D8BFD8",
    "",
    "LightSalmon4",
    "139 87 66",
    "#8B5742"
  ],
  [
    "雪白",
    "Snow",
    "255 250 250",
    "#FFFAFA",
    "橙色",
    "Orange",
    "255 165 0",
    "#FFA500"
  ],
  [
    "",
    "Snow2",
    "238 233 233",
    "#EEE9E9",
    "",
    "Orange2",
    "238 154 0",
    "#EE9A00"
  ],
  [
    "",
    "Snow3",
    "205 201 201",
    "#CDC9C9",
    "",
    "Orange3",
    "205 133 0",
    "#CD8500"
  ],
  [
    "",
    "Snow4",
    "139 137 137",
    "#8B8989",
    "",
    "Orange4",
    "139 90 0",
    "#8B5A00"
  ],
  [
    "海贝壳色",
    "Seashell",
    "255 245 238",
    "#FFF5EE",
    "",
    "DarkOrange1",
    "255 127 0",
    "#FF7F00"
  ],
  [
    "",
    "Seashell2",
    "238 229 222",
    "#EEE5DE",
    "",
    "DarkOrange2",
    "238 118 0",
    "#EE7600"
  ],
  [
    "",
    "Seashell3",
    "205 197 191",
    "#CDC5BF",
    "",
    "DarkOrange3",
    "205 102 0",
    "#CD6600"
  ],
  [
    "",
    "Seashell4",
    "139 134 130",
    "#8B8682",
    "",
    "DarkOrange4",
    "139 69 0",
    "#8B4500"
  ],
  [
    "",
    "AntiqueWhite1",
    "255 239 219",
    "#FFEFDB",
    "",
    "Coral1",
    "255 114 86",
    "#FF7256"
  ],
  [
    "",
    "AntiqueWhite2",
    "238 223 204",
    "#EEDFCC",
    "",
    "Coral2",
    "238 106 80",
    "#EE6A50"
  ],
  [
    "",
    "AntiqueWhite3",
    "205 192 176",
    "#CDC0B0",
    "",
    "Coral3",
    "205 91 69",
    "#CD5B45"
  ],
  [
    "",
    "AntiqueWhite4",
    "139 131 120",
    "#8B8378",
    "",
    "Coral4",
    "139 62 47",
    "#8B3E2F"
  ],
  [
    "陶坯黄",
    "Bisque",
    "255 228 196",
    "#FFE4C4",
    "蕃茄红",
    "Tomato",
    "255 99 71",
    "#FF6347"
  ],
  [
    "",
    "Bisque2",
    "238 213 183",
    "#EED5B7",
    "",
    "Tomato2",
    "238 92 66",
    "#EE5C42"
  ],
  [
    "",
    "Bisque3",
    "205 183 158",
    "#CDB79E",
    "",
    "Tomato3",
    "205 79 57",
    "#CD4F39"
  ],
  [
    "",
    "Bisque4",
    "139 125 107",
    "#8B7D6B",
    "",
    "Tomato4",
    "139 54 38",
    "#8B3626"
  ],
  [
    "桃肉色",
    "PeachPuff",
    "255 218 185",
    "#FFDAB9",
    "桔红",
    "OrangeRed",
    "255 69 0",
    "#FF4500"
  ],
  [
    "",
    "PeachPuff2",
    "238 203 173",
    "#EECBAD",
    "",
    "OrangeRed2",
    "238 64 0",
    "#EE4000"
  ],
  [
    "",
    "PeachPuff3",
    "205 175 149",
    "#CDAF95",
    "",
    "OrangeRed3",
    "205 55 0",
    "#CD3700"
  ],
  [
    "",
    "PeachPuff4",
    "139 119 101",
    "#8B7765",
    "",
    "OrangeRed4",
    "139 37 0",
    "#8B2500"
  ],
  [
    "纳瓦白(土著白)",
    "NavajoWhite",
    "255 222 173",
    "#FFDEAD",
    "红色",
    "Red",
    "255 0 0",
    "#FF0000"
  ],
  [
    "",
    "NavajoWhite2",
    "238 207 161",
    "#EECFA1",
    "",
    "Red2",
    "238 0 0",
    "#EE0000"
  ],
  [
    "",
    "NavajoWhite3",
    "205 179 139",
    "#CDB38B",
    "",
    "Red3",
    "205 0 0",
    "#CD0000"
  ],
  [
    "",
    "NavajoWhite4",
    "139 121 94",
    "#8B795E",
    "深红色",
    "DarkRed",
    "139 0 0",
    "#8B0000"
  ],
  [
    "柠檬绸",
    "LemonChiffon",
    "255 250 205",
    "#FFFACD",
    "深粉红",
    "DeepPink",
    "255 20 147",
    "#FF1493"
  ],
  [
    "",
    "LemonChiffon2",
    "238 233 191",
    "#EEE9BF",
    "",
    "DeepPink2",
    "238 18 137",
    "#EE1289"
  ],
  [
    "",
    "LemonChiffon3",
    "205 201 165",
    "#CDC9A5",
    "",
    "DeepPink3",
    "205 16 118",
    "#CD1076"
  ],
  [
    "",
    "LemonChiffon4",
    "139 137 112",
    "#8B8970",
    "",
    "DeepPink4",
    "139 10 80",
    "#8B0A50"
  ],
  [
    "玉米丝色",
    "Cornsilk",
    "255 248 220",
    "#FFF8DC",
    "",
    "HotPink1",
    "255 110 180",
    "#FF6EB4"
  ],
  [
    "",
    "Cornsilk2",
    "238 232 205",
    "#EEE8CD",
    "",
    "HotPink2",
    "238 106 167",
    "#EE6AA7"
  ],
  [
    "",
    "Cornsilk3",
    "205 200 177",
    "#CDC8B1",
    "",
    "HotPink3",
    "205 96 144",
    "#CD6090"
  ],
  [
    "",
    "Cornsilk4",
    "139 136 120",
    "#8B8878",
    "",
    "HotPink4",
    "139 58 98",
    "#8B3A62"
  ],
  [
    "象牙色",
    "Ivory",
    "255 255 240",
    "#FFFFF0",
    "",
    "Pink1",
    "255 181 197",
    "#FFB5C5"
  ],
  [
    "",
    "Ivory2",
    "238 238 224",
    "#EEEEE0",
    "",
    "Pink2",
    "238 169 184",
    "#EEA9B8"
  ],
  [
    "",
    "Ivory3",
    "205 205 193",
    "#CDCDC1",
    "",
    "Pink3",
    "205 145 158",
    "#CD919E"
  ],
  [
    "",
    "Ivory4",
    "139 139 131",
    "#8B8B83",
    "",
    "Pink4",
    "139 99 108",
    "#8B636C"
  ],
  [
    "蜜露橙",
    "Honeydew",
    "240 255 240",
    "#F0FFF0",
    "",
    "LightPink1",
    "255 174 185",
    "#FFAEB9"
  ],
  [
    "",
    "Honeydew2",
    "224 238 224",
    "#E0EEE0",
    "",
    "LightPink2",
    "238 162 173",
    "#EEA2AD"
  ],
  [
    "",
    "Honeydew3",
    "193 205 193",
    "#C1CDC1",
    "",
    "LightPink3",
    "205 140 149",
    "#CD8C95"
  ],
  [
    "",
    "Honeydew4",
    "131 139 131",
    "#838B83",
    "",
    "LightPink4",
    "139 95 101",
    "#8B5F65"
  ],
  [
    "淡紫红",
    "LavenderBlush",
    "255 240 245",
    "#FFF0F5",
    "",
    "PaleVioletRed1",
    "255 130 171",
    "#FF82AB"
  ],
  [
    "",
    "LavenderBlush2",
    "238 224 229",
    "#EEE0E5",
    "",
    "PaleVioletRed2",
    "238 121 159",
    "#EE799F"
  ],
  [
    "",
    "LavenderBlush3",
    "205 193 197",
    "#CDC1C5",
    "",
    "PaleVioletRed3",
    "205 104 137",
    "#CD6889"
  ],
  [
    "",
    "LavenderBlush4",
    "139 131 134",
    "#8B8386",
    "",
    "PaleVioletRed4",
    "139 71 93",
    "#8B475D"
  ],
  [
    "浅玫瑰色(薄雾玫瑰)",
    "MistyRose",
    "255 228 225",
    "#FFE4E1",
    "",
    "Maroon1",
    "255 52 179",
    "#FF34B3"
  ],
  [
    "",
    "MistyRose2",
    "238 213 210",
    "#EED5D2",
    "",
    "Maroon2",
    "238 48 167",
    "#EE30A7"
  ],
  [
    "",
    "MistyRose3",
    "205 183 181",
    "#CDB7B5",
    "",
    "Maroon3",
    "205 41 144",
    "#CD2990"
  ],
  [
    "",
    "MistyRose4",
    "139 125 123",
    "#8B7D7B",
    "",
    "Maroon4",
    "139 28 98",
    "#8B1C62"
  ],
  [
    "天蓝色",
    "Azure",
    "240 255 255",
    "#F0FFFF",
    "",
    "VioletRed1",
    "255 62 150",
    "#FF3E96"
  ],
  [
    "",
    "Azure2",
    "224 238 238",
    "#E0EEEE",
    "",
    "VioletRed2",
    "238 58 140",
    "#EE3A8C"
  ],
  [
    "",
    "Azure3",
    "193 205 205",
    "#C1CDCD",
    "",
    "VioletRed3",
    "205 50 120",
    "#CD3278"
  ],
  [
    "",
    "Azure4",
    "131 139 139",
    "#838B8B",
    "",
    "VioletRed4",
    "139 34 82",
    "#8B2252"
  ],
  [
    "",
    "SlateBlue1",
    "131 111 255",
    "#836FFF",
    "深红色",
    "Fuchsia",
    "255 0 255",
    "#FF00FF"
  ],
  [
    "",
    "SlateBlue2",
    "122 103 238",
    "#7A67EE",
    "",
    "Magenta2",
    "238 0 238",
    "#EE00EE"
  ],
  [
    "",
    "SlateBlue3",
    "105 89 205",
    "#6959CD",
    "",
    "Magenta3",
    "205 0 205",
    "#CD00CD"
  ],
  [
    "",
    "SlateBlue4",
    "71 60 139",
    "#473C8B",
    "深洋红",
    "DarkMagenta",
    "139 0 139",
    "#8B008B"
  ],
  [
    "",
    "RoyalBlue1",
    "72 118 255",
    "#4876FF",
    "",
    "Orchid1",
    "255 131 250",
    "#FF83FA"
  ],
  [
    "",
    "RoyalBlue2",
    "67 110 238",
    "#436EEE",
    "",
    "Orchid2",
    "238 122 233",
    "#EE7AE9"
  ],
  [
    "",
    "RoyalBlue3",
    "58 95 205",
    "#3A5FCD",
    "",
    "Orchid3",
    "205 105 201",
    "#CD69C9"
  ],
  [
    "",
    "RoyalBlue4",
    "39 64 139",
    "#27408B",
    "",
    "Orchid4",
    "139 71 137",
    "#8B4789"
  ],
  [
    "蓝色",
    "Blue",
    "0 0 255",
    "#0000FF",
    "",
    "Plum1",
    "255 187 255",
    "#FFBBFF"
  ],
  [
    "",
    "Blue2",
    "0 0 238",
    "#0000EE",
    "",
    "Plum2",
    "238 174 238",
    "#EEAEEE"
  ],
  [
    "中蓝色",
    "MediumBlue",
    "0 0 205",
    "#0000CD",
    "",
    "Plum3",
    "205 150 205",
    "#CD96CD"
  ],
  [
    "暗蓝色",
    "DarkBlue",
    "0 0 139",
    "#00008B",
    "",
    "Plum4",
    "139 102 139",
    "#8B668B"
  ],
  [
    "闪兰色(道奇蓝)",
    "DodgerBlue",
    "30 144 255",
    "#1E90FF",
    "",
    "MediumOrchid1",
    "224 102 255",
    "#E066FF"
  ],
  [
    "",
    "DodgerBlue2",
    "28 134 238",
    "#1C86EE",
    "",
    "MediumOrchid2",
    "209 95 238",
    "#D15FEE"
  ],
  [
    "",
    "DodgerBlue3",
    "24 116 205",
    "#1874CD",
    "",
    "MediumOrchid3",
    "180 82 205",
    "#B452CD"
  ],
  [
    "",
    "DodgerBlue4",
    "16 78 139",
    "#104E8B",
    "",
    "MediumOrchid4",
    "122 55 139",
    "#7A378B"
  ],
  [
    "",
    "SteelBlue1",
    "99 184 255",
    "#63B8FF",
    "",
    "DarkOrchid1",
    "191 62 255",
    "#BF3EFF"
  ],
  [
    "",
    "SteelBlue2",
    "92 172 238",
    "#5CACEE",
    "",
    "DarkOrchid2",
    "178 58 238",
    "#B23AEE"
  ],
  [
    "",
    "SteelBlue3",
    "79 148 205",
    "#4F94CD",
    "",
    "DarkOrchid3",
    "154 50 205",
    "#9A32CD"
  ],
  [
    "",
    "SteelBlue4",
    "54 100 139",
    "#36648B",
    "",
    "DarkOrchid4",
    "104 34 139",
    "#68228B"
  ],
  [
    "深天蓝",
    "DeepSkyBlue",
    "0 191 255",
    "#00BFFF",
    "",
    "Purple1",
    "155 48 255",
    "#9B30FF"
  ],
  [
    "",
    "DeepSkyBlue2",
    "0 178 238",
    "#00B2EE",
    "",
    "Purple2",
    "145 44 238",
    "#912CEE"
  ],
  [
    "",
    "DeepSkyBlue3",
    "0 154 205",
    "#009ACD",
    "",
    "Purple3",
    "125 38 205",
    "#7D26CD"
  ],
  [
    "",
    "DeepSkyBlue4",
    "0 104 139",
    "#00688B",
    "",
    "Purple4",
    "85 26 139",
    "#551A8B"
  ],
  [
    "",
    "SkyBlue1",
    "135 206 255",
    "#87CEFF",
    "",
    "MediumPurple1",
    "171 130 255",
    "#AB82FF"
  ],
  [
    "",
    "SkyBlue2",
    "126 192 238",
    "#7EC0EE",
    "",
    "MediumPurple2",
    "159 121 238",
    "#9F79EE"
  ],
  [
    "",
    "SkyBlue3",
    "108 166 205",
    "#6CA6CD",
    "",
    "MediumPurple3",
    "137 104 205",
    "#8968CD"
  ],
  [
    "",
    "SkyBlue4",
    "74 112 139",
    "#4A708B",
    "",
    "MediumPurple4",
    "93 71 139",
    "#5D478B"
  ],
  [
    "",
    "LightSkyBlue1",
    "176 226 255",
    "#B0E2FF",
    "",
    "Thistle1",
    "255 225 255",
    "#FFE1FF"
  ],
  [
    "",
    "LightSkyBlue2",
    "164 211 238",
    "#A4D3EE",
    "",
    "Thistle2",
    "238 210 238",
    "#EED2EE"
  ],
  [
    "",
    "LightSkyBlue3",
    "141 182 205",
    "#8DB6CD",
    "",
    "Thistle3",
    "205 181 205",
    "#CDB5CD"
  ],
  [
    "",
    "LightSkyBlue4",
    "96 123 139",
    "#607B8B",
    "",
    "Thistle4",
    "139 123 139",
    "#8B7B8B"
  ],
  [
    "",
    "SlateGray1",
    "198 226 255",
    "#C6E2FF",
    "",
    "grey11",
    "28 28 28",
    "#1C1C1C"
  ],
  [
    "",
    "SlateGray2",
    "185 211 238",
    "#B9D3EE",
    "",
    "grey21",
    "54 54 54",
    "#363636"
  ],
  [
    "",
    "SlateGray3",
    "159 182 205",
    "#9FB6CD",
    "",
    "grey31",
    "79 79 79",
    "#4F4F4F"
  ],
  [
    "",
    "SlateGray4",
    "108 123 139",
    "#6C7B8B",
    "暗淡的灰色",
    "DimGray",
    "105 105 105",
    "#696969"
  ],
  [
    "",
    "LightSteelBlue1",
    "202 225 255",
    "#CAE1FF",
    "",
    "grey51",
    "130 130 130",
    "#828282"
  ],
  [
    "",
    "LightSteelBlue2",
    "188 210 238",
    "#BCD2EE",
    "",
    "grey61",
    "156 156 156",
    "#9C9C9C"
  ],
  [
    "",
    "LightSteelBlue3",
    "162 181 205",
    "#A2B5CD",
    "",
    "grey71",
    "181 181 181",
    "#B5B5B5"
  ],
  [
    "",
    "LightSteelBlue4",
    "110 123 139",
    "#6E7B8B",
    "",
    "gray81",
    "207 207 207",
    "#CFCFCF"
  ],
  [
    "",
    "LightBlue1",
    "191 239 255",
    "#BFEFFF",
    "",
    "gray91",
    "232 232 232",
    "#E8E8E8"
  ],
  [
    "",
    "LightBlue2",
    "178 223 238",
    "#B2DFEE",
    "深灰色",
    "DarkGray",
    "169 169 169",
    "#A9A9A9"
  ],
  [
    "",
    "LightBlue3",
    "154 192 205",
    "#9AC0CD",
    "暗蓝色",
    "DarkBlue",
    "0 0 139",
    "#00008B"
  ],
  [
    "",
    "LightBlue4",
    "104 131 139",
    "#68838B",
    "暗青色",
    "DarkCyan",
    "0 139 139",
    "#008B8B"
  ],
  [
    "淡青色",
    "LightCyan",
    "224 255 255",
    "#E0FFFF",
    "深洋红",
    "DarkMagenta",
    "139 0 139",
    "#8B008B"
  ],
  [
    "",
    "LightCyan2",
    "209 238 238",
    "#D1EEEE",
    "深红色",
    "DarkRed",
    "139 0 0",
    "#8B0000"
  ],
  [
    "",
    "LightCyan3",
    "180 205 205",
    "#B4CDCD",
    "淡绿色",
    "LightGreen",
    "144 238 144",
    "#90EE9"
  ]
])
</script>
