# 音乐源地址

## api

我们知道网易云音乐上的一首歌 ID，如何获取它的 MP3 源地址呢？其实网易云音提供了转换的地址：
`http://music.163.com/song/media/outer/url?id=**ID数字**.mp3`
把上面红色部分ID数字换成网易云播放页面的即可，举个例子：
朴树的「平凡之路」，这首歌的地址是：
`https://music.163.com/#/song?id=29750099`
这首歌的 ID 是：29750099，那么它的 MP3 地址是：
`https://music.163.com/song/media/outer/url?id=29750099.mp3`
