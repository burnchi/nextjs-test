"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { BiCategory } from "react-icons/bi";
import { BsPostcard } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { VscDashboard } from "react-icons/vsc";

export const headerItems = [
  {
    id: 1,
    label: "仪表盘",
    icon: VscDashboard,
    href: "/dashboard",
  },
  {
    id: 2,
    label: "文章",
    icon: BsPostcard,
    href: "/posts",
    children: [
      {
        id: 3,
        label: "文章分类",
        icon: BiCategory,
        href: "/posts/category",
        children: [
          // href === /posts/category/xxx  动态路由 (注意动态路由的href最后有一个/ 必须！！)
          {
            id: 4,
            label: "分类",
            icon: MdCategory,
            href: "/posts/category/1",
            dynamic: true,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    label: "附件",
    icon: FaRegFileAlt,
    href: "/upload",
  },
];
const Header = () => {
  const pathname = usePathname();
  const currentHeader = findNodeByHref(headerItems, pathname) || headerItems[0];
  console.log([...headerItems]);

  return (
    <div
      style={{
        height: "60px",
        width: "100%",
        padding: "16px",
        background: "violet",
      }}
    >
      <span>{currentHeader?.label}</span>
      <IconItem icon={currentHeader?.icon} />
    </div>
  );
};

export default Header;

const IconItem = ({ icon: Icon }: { icon: IconType }) => {
  return <Icon />;
};

// 通过href找到相应的对象，包括children里的也能找到
function findNodeByHref(nodes: any, href: string) {
  const stack = [...nodes]; // 使用栈来存储待处理的节点

  while (stack.length > 0) {
    const node = stack.pop(); // 弹出栈顶节点

    // 动态路由最后有/ 所以不符合第一个条件，直接看第二个条件
    if (node.href === href || (node.dynamic && href.includes(node.href))) {
      return node; // 找到了匹配的节点
    }

    // 如果有children属性
    if (node?.children?.length > 0) {
      stack.push(...node.children); // 将子节点入栈，继续搜索
    }
  }

  return null; // 没有找到匹配的节点
}
