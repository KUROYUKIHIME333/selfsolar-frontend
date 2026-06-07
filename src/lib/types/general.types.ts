export type PostItType = "badge" | "post-it" | "tips" | "idea";

export type PlaceholderEquipementType = {
  nom: string;
  puissance: number;
  duree: number;
};

export type StatusBackend =
  | "opérationnel"
  | "arrêt temporaire"
  | "en maintenance"
  | "fonctionnement restreint"
  | "arrêt définitif";

export type BackendHealthType = {
  api: "SelfSolar API";
  version: string;
  status: StatusBackend;
  endpoints: {
    pv: string;
    documentation: string;
  };
};

export interface MenuItem {
  label: string;
  description: string;
  link: string | undefined;
  sub_menu: MenuItem[] | undefined;
}

export interface HeaderProps {
  menu?: MenuItem[];
  logoText?: string;
  logoLink?: string;
}

export interface FooterNavItem {
  label: string;
  description: string;
  link: string;
  sub_menu: FooterNavItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  brandName?: string;
  tagline?: string;
  copyright?: string;
  links?: FooterLink[];
  footerNav?: FooterNavItem[];
  showBackToTop?: boolean;
}
