import { StaticImageData } from "next/image";
import { IconType } from "react-icons";

export interface SidebarProps {
    children: React.ReactNode
}

export interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

export interface SidebarItem {
    icon: IconType;
    label: string;
    href: string;
    active?: boolean;
}

export interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

export interface ListItemProps {
    image: string | StaticImageData;
    name: string;
    href: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{};