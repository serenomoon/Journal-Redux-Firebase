import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { TurnedInNot } from '@mui/icons-material';
import { setACtiveNote } from "../../store/journal";

export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    },[ title ])

    const onClickNote = () => {
        dispatch( setACtiveNote( { id,title,body,date,imageUrls } ) );
    }

  return (
    <ListItem disablePadding>
        <ListItemButton
            onClick={ onClickNote }
        >
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ body } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
