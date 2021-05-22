import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { history } from '../reducers/store';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function LeftNav() {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <List>
                <ListItem button onClick={() => history.push("/")}>
                    <ListItemText primary={"Welcome"} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => history.push("/createLeague")}>
                    <ListItemText primary={"Create League"} />
                </ListItem>
                <ListItem button onClick={() => history.push("/upload")}>
                    <ListItemText primary={"Upload"} />
                </ListItem>
            </List>
        </Drawer>
    );
}
