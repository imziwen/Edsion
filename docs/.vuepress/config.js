module.exports = {
  title: "子文",
  description: "前端基础笔记、前端进阶、大前端、JavaScript",
  base: "/",
  host: "0.0.0.0",
  head: [
    [
      "script",
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?1cda0c3a27ed754d6344dcce0e142e04";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `
    ],
//     [
//       "script",
//       {},
//       `
//       //拿到Performance并且初始化一些参数
// let timing = performance.timing,
//     start = timing.navigationStart,
//     dnsTime = 0,
//     tcpTime = 0,
//     firstPaintTime = 0,
//     domRenderTime = 0,
//     loadTime = 0;
//     //根据提供的api和属性，拿到对应的时间
//     dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
//     tcpTime = timing.connectEnd - timing.connectStart;
//     firstPaintTime = timing.responseStart - start;
//     domRenderTime = timing.domContentLoadedEventEnd - start;
//     loadTime = timing.loadEventEnd - start;
//
// console.log('DNS解析时间:', dnsTime,
//     '\\nTCP建立时间:', tcpTime,
//     '\\n首屏时间:', firstPaintTime,
//     '\\ndom渲染完成时间:', domRenderTime,
//     '\\n页面onload时间:', loadTime);
//     `
//     ],
    [
      "link",
      { rel: "shortcut icon", type: "image/x-icon", href: `/img/favicon.ico` }
    ],
    ["link", { rel: "dns-prefetch", href: `//f1g1ns1.dnspod.net` }],
    ["meta", { name: "baidu-site-verification", content: "C7pbYsRSpU" }],
    ["meta", { name: "X-UA-Compatible", content: "IE=edge,chrome=1" }],
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1.0,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
      }
    ],
    ["meta", { name: "author", content: "ziwen,okziwen@foxmail.com" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "ziwen" }]
  ],
  themeConfig: {
    smoothScroll: true,
    logo: "/img/Javascript.gif",
    nav: [
      { text: "基础笔记(更新中...)", link: "/question/" }
      // { text: "打下基础", link: "/notes/" },
      // { text: "小思考", link: "/think/" }
    ],
    sidebar: "auto",
    sidebar: {
      // "/notes/": [
      //   {
      //     title: "调用堆栈",
      //     children: [
      //       // "/notes/1/执行上下文栈和变量对象.md"
      //       "/notes/1/执行上下文与执行栈.md",
      //       "/notes/1/执行上下文栈与变量对象.md"
      //     ]
      //   },
      //   {
      //     title: "作用域闭包",
      //     children: [
      //       "/notes/2/深入浅出作用域和闭包.md",
      //       "/notes/2/从作用域链理解闭包.md"
      //     ]
      //   },
      //   {
      //     title: "webpack原理",
      //     children: ["/notes/17/webpack浅入深出.md"]
      //   },
      //   {
      //     title: "函数",
      //     children: ["/notes/18/函数形参默认值", "/notes/18/箭头函数"]
      //   },
      //   {
      //     title: "关于this",
      //     children: ["/notes/19/this全面解析"]
      //   }
      // ],
      "/question/": [
        {
          title: "JavaScript篇",
          children: ["/question/1/js.md"]
        },
        {
          title: "框架篇",
          children: [
            "/question/2/mvvm.md",
            "/question/2/vuetx.md",
            "/question/2/vdom.md",
            "/question/2/不能用index作为key.md",
            "/question/2/模板编译.md",
            "/question/2/前端路由原理.md"
          ]
        },
        {
          title: "性能篇",
          children: ["/question/5/performance.md", "/question/5/ymxnyh.md"]
        },
        {
          title: "项目工程篇",
          children: [
            "/question/6/前端代码为何要进行构建打包",
            "/question/6/trycach",
            "/question/6/project.md",
            "/question/6/webpackyh.md",
            "/question/6/codereview-list.md"
          ]
        },
        {
          title: "HTML篇",
          children: [
            "/question/3/html.md",
            "/question/3/meta.md",
            "/question/3/cpch.md",
            "/question/3/domadd.md",
            "/question/3/windoc.md"
          ]
        },
        {
          title: "CSS篇",
          children: [
            "/question/0/css.md",
            "/question/0/margin.md",
            "/question/0/click.md"
          ]
        },

        {
          title: "网络篇",
          children: [
            "/question/4/network.md",
            "/question/4/kuayu.md",
            "/question/4/tcp.md",
            "/question/4/udp.md",
            "/question/4/https.md",
            "/question/4/browsercache.md"

          ]
        }
      ]
    },
    sidebarDepth: 3,
    configureWebpack: {
      resolve: {
        alias: {
          "@alias": "/img"
        }
      }
    }
    // displayAllHeaders: true
  },
  plugins: [
    // [
    //   "vuepress-plugin-comment",
    //   {
    //     choosen: "valine",
    //     // options选项中的所有参数，会传给Valine的配置
    //     options: {
    //       el: "#valine-vuepress-comment",
    //       appId: "i8TvBJNEW9QHt5FoWRMwgjzt-gzGzoHsz",
    //       appKey: "3dBEGx4eFPrWLM60rLWYrRXE",
    //       notify: false,
    //       verify: false,
    //       avatar: "retro",
    //       placeholder: "大佬请上座：)",
    //       visitor: "true"
    //     }
    //   }
    // ],

    [
      "vuepress-plugin-container",
      {
        type: "cd",
        defaultTitle: "点击查看",
        before: info =>
          `<details class="custom-block details open tip"><summary>${info}</summary>`,
        after: `</details>`
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "t", // 无标题tips
        defaultTitle: "",
        before: info => `<div class="custom-block tip">${info}`,
        after: `</div>`
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "zimg", // 无标题tips
        defaultTitle: "",
        before: info => `<img src=${info}`,
        after: `class="zoom-custom-imgs">`
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "theorem",
        before: info => `<div class="theorem"><p class="title">${info}</p>`,
        after: "</div>"
      }
    ],
    [
      "vuepress-plugin-container",
      {
        type: "right",
        defaultTitle: ""
      }
    ],
    // ["@vuepress/back-to-top"],
    ["@vuepress/nprogress"],
    // ["@vuepress/active-header-links"],
    // ["@vuepress/medium-zoom"],
    [
      "@vuepress/medium-zoom",
      {
        selector: "img.zoom-custom-imgs",
        // medium-zoom options here
        // See: https://github.com/francoischalifour/medium-zoom#options
        options: {
          margin: 16
        }
      }
    ],
    "@vuepress/back-to-top"
  ]
};
