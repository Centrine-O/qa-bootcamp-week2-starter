// Toolshop shopper profiles. Settings are optional because the API
// doesn't always send them.
type ShopperProfile = {
  id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};

// Wants every deal alert going.
const wanjiku: ShopperProfile = {
  id: 101,
  username: 'wanjiku_tools',
  settings: { notifications: true },
};

// Never opened the settings page.
const otieno: ShopperProfile = {
  id: 102,
  username: 'otieno_diy',
};

// Opened settings but never picked anything.
const achieng: ShopperProfile = {
  id: 103,
  username: 'achieng_builds',
  settings: {},
};

// Turned alerts off on purpose.
const kamau: ShopperProfile = {
  id: 104,
  username: 'kamau_pliers',
  settings: { notifications: false },
};

// Missing settings or a missing notifications value both count as "no".
function isNotified(shopper: ShopperProfile): boolean {
  return shopper.settings?.notifications ?? false;
}

const shoppers = [wanjiku, otieno, achieng, kamau];

for (const shopper of shoppers) {
  const status = isNotified(shopper) ? 'gets alerts 🔔' : 'no alerts 🔕';
  console.log(`#${shopper.id} ${shopper.username}: ${status}`);
}
