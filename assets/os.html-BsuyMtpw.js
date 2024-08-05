import{_ as e,c as n,o,a as t}from"./app-CbULZrmi.js";const i={},r=t("h1",{id:"os",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#os"},[t("span",null,"os")])],-1),s=t("pre",null,[t("code",{class:"language-go"},`package main

import (
    "fmt"
    "runtime"
    "time"

    "github.com/shirou/gopsutil/cpu"
    "github.com/shirou/gopsutil/disk"
    "github.com/shirou/gopsutil/load"
    "github.com/shirou/gopsutil/mem"
)

const (
    B  = 1
    KB = 1024 * B
    MB = 1024 * KB
    GB = 1024 * MB
)

func main() {
    DiskCheck()
    OSCheck()
    CPUCheck()
    RAMCheck()
}

//服务器硬盘使用量
func DiskCheck() {
    u, _ := disk.Usage("/")
    usedMB := int(u.Used) / MB
    usedGB := int(u.Used) / GB
    totalMB := int(u.Total) / MB
    totalGB := int(u.Total) / GB
    usedPercent := int(u.UsedPercent)
    fmt.Printf("Free space: %dMB (%dGB) / %dMB (%dGB) | Used: %d%%\\n", usedMB, usedGB, totalMB, totalGB, usedPercent)
}

//OS
func OSCheck() {
    fmt.Printf("goOs:%s,compiler:%s,numCpu:%d,version:%s,numGoroutine:%d\\n", runtime.GOOS, runtime.Compiler, runtime.NumCPU(), runtime.Version(), runtime.NumGoroutine())
}

//CPU 使用量
func CPUCheck() {
    cores, _ := cpu.Counts(false)

    cpus, err := cpu.Percent(time.Duration(200)*time.Millisecond, true)
    if err == nil {
        for i, c := range cpus {
            fmt.Printf("cpu%d : %f%%\\n", i, c)
        }
    }
    a, _ := load.Avg()
    l1 := a.Load1
    l5 := a.Load5
    l15 := a.Load15
    fmt.Println(l1)
    fmt.Println(l5)
    fmt.Println(l15)
    fmt.Println(cores)
}

//内存使用量
func RAMCheck() {
    u, _ := mem.VirtualMemory()
    usedMB := int(u.Used) / MB
    totalMB := int(u.Total) / MB
    usedPercent := int(u.UsedPercent)
    fmt.Printf("usedMB:%d,totalMB:%d,usedPercent:%d", usedMB, totalMB, usedPercent)
}
`)],-1),c=[r,s];function a(u,d){return o(),n("div",null,c)}const l=e(i,[["render",a],["__file","os.html.vue"]]),p=JSON.parse('{"path":"/go-tutor/snippet/os.html","title":"os","lang":"zh-CN","frontmatter":{"description":"os","head":[["meta",{"property":"og:url","content":"https://yzqdev.github.io/cs-guide/cs-guide/go-tutor/snippet/os.html"}],["meta",{"property":"og:site_name","content":"cs-guide"}],["meta",{"property":"og:title","content":"os"}],["meta",{"property":"og:description","content":"os"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-08-21T02:04:02.000Z"}],["meta",{"property":"article:author","content":"yzqdev"}],["meta",{"property":"article:modified_time","content":"2022-08-21T02:04:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"os\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-08-21T02:04:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"yzqdev\\",\\"url\\":\\"http://www.yzqdev.top\\"}]}"]]},"headers":[],"git":{"createdTime":1661047442000,"updatedTime":1661047442000,"contributors":[{"name":"yzqdev","email":"yzqdev@outlook.com","commits":1}]},"readingTime":{"minutes":0.62,"words":187},"filePathRelative":"go-tutor/snippet/os.md","localizedDate":"2022年8月21日","autoDesc":true}');export{l as comp,p as data};
