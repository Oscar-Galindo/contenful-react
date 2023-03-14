import { useEffect, useState } from 'react';
import { client } from '../../client';
import NavigationItems from './NavigationItems';
function NavigationMenu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    client.getEntries({
      content_type: 'navigation',
      order: 'fields.orderOfNav'
    })
    .then(response => {
      setMenuItems(response.items);
    })
    .catch(console.error);
  }, []);

  return (
    <nav>
    <ul>
      {menuItems.map(({sys, fields}) => {
        const {id} = sys;
        const {navTitle, navUrl, orderOfNav} = fields;

        return <NavigationItems key={id} navTitle={navTitle} navUrl={navUrl} navOrder={orderOfNav} />;
      })}
    </ul>
  </nav>
  );
}

export default NavigationMenu;