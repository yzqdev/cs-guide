# 问题

如何打包<https://blog.panpili.com/2022/coding/dotnet/quit-winui-now/>


## unpackage模式找不到ApplicationData.Current

Windows.Storage.ApplicationData.Current only applies to packaged apps that have an identity (UWP apps and Desktop Bridge apps). Unpackaged Win32 EXE don't have the concept of their own isolated app data.

It's not clear why you need to this here, or what you are trying to accomplish. This shouldn't have anything to do with cracks in the audio playback.
