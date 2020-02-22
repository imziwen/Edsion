module.exports = {
  title: "子文",
  description: "前端学习笔记，前端进阶，大前端",
  base: "/",
  host: "0.0.0.0",
  head: [
    [
      "link",
      { rel: "shortcut icon", type: "image/x-icon", href: `/img/favicon.ico` }
    ]
  ],
  themeConfig: {
    smoothScroll: true,
    logo: "/img/Javascript.gif",
    nav: [
      { text: "小题巩固", link: "/question/" },
      { text: "打下基础", link: "/notes/" }

      // {
      //   text: "附录",
      //   link: "/error",
      //   items: [
      //     {
      //       text: "Group1",
      //       items: [123]
      //     },
      //     {
      //       text: "Group2",
      //       items: [456]
      //     }
      //   ]
      // }
    ],
    sidebar: "auto",
    sidebar: {
      "/notes/": [
        {
          title: "调用堆栈",
          children: [
            // "/notes/1/执行上下文栈和变量对象.md"
            "/notes/1/执行上下文与执行栈.md",
            "/notes/1/执行上下文栈与变量对象.md"
          ]
        },
        {
          title: "作用域闭包",
          children: [
            "/notes/2/深入浅出作用域和闭包.md",
            "/notes/2/从作用域链理解闭包.md"
          ]
        },
        {
          title: "webpack原理",
          children: ["/notes/17/webpack浅入深出.md"]
        },
        {
          title: "函数",
          children: ["/notes/18/函数形参默认值", "/notes/18/箭头函数"]
        },
        {
          title: "关于this",
          children: ["/notes/19/this全面解析"]
        }
      ],
      "/question/": [
        {
          title: "JavaScript",
          children: ["/question/1/js.md"]
        },
        {
          title: "HTML",
          children: ["/question/3/html.md"]
        },
        {
          title: "CSS",
          children: ["/question/0/css.md"]
        },
        {
          title: "前端框架",
          children: ["/question/2/mvvm.md"]
        },
        {
          title: "浏览器",
          children: ["/question/4/browser.md"]
        },
        {
          title: "性能优化",
          children: ["/question/5/performance.md"]
        },
        {
          title: "工程化",
          children: ["/question/6/project.md"]
        }
      ]
    },
    sidebarDepth: 2,
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
        defaultTitle: "点击查看答案",
        before: info =>
          `<details open class="custom-block details"><summary>${info}</summary>`,
        after: `</details>`
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
    // ["@vuepress/nprogress"],
    // ["@vuepress/active-header-links"],
    // ["@vuepress/medium-zoom"]
    "@vuepress/back-to-top"
  ]
};
