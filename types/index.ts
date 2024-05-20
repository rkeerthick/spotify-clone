import { StaticImageData } from "next/image";
import { IconType } from "react-icons";
import Stripe from "stripe";

export interface SidebarProps {
  children: React.ReactNode;
  userSongs: Song[]
}

export interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

export interface SidebarItemProps {
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface SupabaseProviderProps {
  children: React.ReactNode;
}

export interface UserProviderProps {
  children: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface Customer {
  id: string;
  stripe_customer_id?: string;
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}

export interface PageContentProps {
  songs: Song[];
}

export interface SongItemProps {
  onClick?: (id: string) => void;
  song: Song;
}

export interface LibraryProps {
  userSongs: Song[];
}

export interface MediaItemProps {
  onClick?: (id: string) => void;
  song: Song;
}

export interface SearchProps {
  searchParams: {
    title: string;
  }
}

export interface SearchContentProps {
  songs: Song[];
}

export interface LikeButtonProps {
  songId: string;
}

export interface LikedContentProps {
  songs: Song[];
}

export interface PlayerStore {
  ids: string[],
  activeId: string | undefined,
  setId: (id: string) => void,
  setIds: (ids: string[]) => void,
  reset: () => void
}

export interface PlayContentProps {
  song: Song;
  songUrl: string;
}

export interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}

export interface ProductWithPrice extends Product {
  prices?: Price[]
}

export interface ModalProviderProps {
  products: ProductWithPrice[]
}

export interface SubscribeModalProps {
  products: ProductWithPrice[]
}

