"use client";
import React from "react";
import { headerItems } from "./Header";
import Link from "next/link";
import { IconType } from "react-icons";

interface navItemProps {
  id: number;
  label: string;
  icon: IconType;
  href: string;
}

interface navItemsProps {
  id: number;
  label: string;
  icon: IconType;
  href: string;
  children?: navItemProps[];
}
const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        position: "fixed",
        bottom: "100px",
        right: "100px",
        padding: "16px",
      }}
    >
      {renderNavItems(headerItems)}
    </div>
  );
};

export default NavBar;

const renderNavItems = (navItems: navItemsProps[], level = 0) => {
  return navItems.map((item) => {
    // 每层加多少间距
    const marginright = level * 20;
    if (item.children) {
      return (
        <div key={item.id}>
          <Link
            href={item.href}
            style={{
              marginLeft: `${marginright}px`,
            }}
          >
            {item.label}
          </Link>
          {renderNavItems(item.children, level + 1)}
        </div>
      );
    }
    return (
      <div key={item.id}>
        <Link
          href={item.href}
          style={{
            marginLeft: `${marginright}px`,
          }}
        >
          {item.label}
        </Link>
      </div>
    );
  });
};
