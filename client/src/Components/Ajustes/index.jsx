import * as React from 'react';
import Tab from '@mui/material/Tab';

import BadgeIcon from '@mui/icons-material/Badge';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Profile from '../Profile/index';
import DashboardAdmin from '../DashboardAdmin/index';
import UsuariosInfo from '../UsuariosInfo/UsuarioInfo'
import { TabContext, TabList, TabPanel } from '@mui/lab';

const Ajustes = () => {
    const [selectedTab, setSelectedTab] = React.useState("Profile");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
    return (
        <TabContext value={selectedTab} defaultValue={Profile}>
        <TabList onChange={handleChange} aria-label="icon label tabs example">
      <Tab icon={<BadgeIcon />} label="Perfil" value="Profile"/>
      <Tab icon={<ManageAccountsIcon />} label="Admin Usuarios" value="AdminUser" />
      <Tab icon={<AttachMoneyIcon />} label="DashBoard" value="DashBoard"/>
    </TabList>
      <TabPanel value="Profile"><Profile/></TabPanel>
      <TabPanel value="AdminUser"><UsuariosInfo/></TabPanel>
      <TabPanel value="DashBoard"><DashboardAdmin/></TabPanel>
     </TabContext>  
    )
}

export default Ajustes;