# 背景

<CssDemo :css-list='cssList' />

<script setup>
    import { h, ref } from 'vue'
    let cssList= ref([
  {background:'green'},
  {background: 'content-box radial-gradient(crimson, skyblue)'},
  {background:'url("https://interactive-examples.mdn.mozilla.net/media/examples/lizard.png") no-repeat'},
  {background: 'left 5% / 15% 60% repeat-x url("../../media/examples/star.png")'},
  {'background-size': 'contain '},
  {'background-size': 'cover'},
])
</script>

```text
background-attachment
background-clip
background-color
background-image
background-origin
background-position
background-repeat
background-size
```
