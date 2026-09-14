import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Bharati Kitchenware | Premium Indian Cookware',
  description: 'Shop high-quality pressure cookers, kadhais, saucepans, and daily essential utensils. Traditional durability meets modern elegance.',
  openGraph: {
    title: 'Bharati Kitchenware | Premium Indian Cookware',
    description: 'Shop high-quality pressure cookers, kadhais, saucepans, and daily essential utensils. Traditional durability meets modern elegance.',
    url: 'https://bharatikitchen.com',
    type: 'website',
  },
};

export default function Page() {
  return <HomeClient />;
}
