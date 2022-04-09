<template>
  <div ref="circle"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
let circle = ref();
onMounted(() => {
  const cos = Math.cos;
  const sin = Math.sin;
  const π = Math.PI;

  const f_matrix_times = ([[a, b], [c, d]], [x, y]) => [
    a * x + b * y,
    c * x + d * y,
  ];
  const f_rotate_matrix = (x) => [
    [cos(x), -sin(x)],
    [sin(x), cos(x)],
  ];
  const f_vec_add = ([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2];

  const f_svg_ellipse_arc = ([cx, cy], [rx, ry], [t1, Δ], φ) => {
    Δ = Δ % (2 * π);
    const rotMatrix = f_rotate_matrix(φ);
    const [sX, sY] = f_vec_add(
      f_matrix_times(rotMatrix, [rx * cos(t1), ry * sin(t1)]),
      [cx, cy]
    );
    const [eX, eY] = f_vec_add(
      f_matrix_times(rotMatrix, [rx * cos(t1 + Δ), ry * sin(t1 + Δ)]),
      [cx, cy]
    );
    const fA = Δ > π ? 1 : 0;
    const fS = Δ > 0 ? 1 : 0;
    // 命名空间
    var SVG_NS = "http://www.w3.org/2000/svg";
    var svgArea = document.getElementById("circle");

    // 1、创建svg容器
    var svg = document.createElementNS(SVG_NS, "svg");

    // 2、创建svg中的 tag, 如rect

    const path_2wk2r = document.createElementNS(SVG_NS, "path");
    path_2wk2r.setAttribute(
      "d",
      "M " +
        sX +
        " " +
        sY +
        " A " +
        [rx, ry, (φ / (2 * π)) * 360, fA, fS, eX, eY].join(" ")
    );

    // 4、将tag塞进svg中
    svg.appendChild(path_2wk2r);
    // 5、将svg塞进指定容器

    return svg;
  };
  let svgDom = f_svg_ellipse_arc([100, 100], [30, 30], [5, 5], 5);

  circle.value.appendChild(svgDom);
});
</script>
