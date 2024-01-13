import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const icons = [
  {
    icon: <SpaceDashboardIcon />,
    title: "Dashboard",
    url: "/stock/",
  },
  {
    title: "Purchases",
    icon: <ShoppingCartIcon />,
    url: "/stock/purchases/",
  },
  {
    title: "Sales",
    icon: <AttachMoneyIcon />,
    url: "/stock/sales/",
  },
  {
    title: "Firms",
    icon: <StoreIcon />,
    url: "/stock/firms/",
  },
  {
    title: "Brands",
    icon: <StarsIcon />,
    url: "/stock/brands/",
  },
  {
    title: "Products",
    icon: <InventoryIcon />,
    url: "/stock/products/",
  },
];

const MenuListItems = () => {
  const navigate = useNavigate();
  return (
    <List>
      {icons.map((item, index) => (
        <ListItem
          sx={{
            color: "white",
            "&:hover": { color: "red" },
            "&:hover .MuiSvgIcon-root": { color: "red" },
            // listiteme tıklandığında iconun rengini kırmızı yap.
            "& .MuiSvgIcon-root": { color: "white" },

            // - nested seçim nested ile iconu beyaz yaptık. svglerin kırmızı olması için yine nested yapı ile yapıldı. Class seviyesine inip stillendirme işlemi yapma. nested yapılarda üstteki bir şeyin hoverı ile altlardaki bişeyi kontrol edebiliyoruz.Ancak burda kural şu illaki nesting olması lazım.
          }}
          key={index}
          disablePadding
          onClick={() => navigate(item.url)}
        >
          <ListItemButton>
            {/* ikonlar yalnızca ilgili bulundukları alanda stillendi. mutlaka svgnin kendi bileşeninden stillendirme yapılmalıdır. */}
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MenuListItems;
