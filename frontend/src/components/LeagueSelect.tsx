import { FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";
import { ILeague } from "../models/league";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

interface ILeagueSelect {
    value?: ILeague;
    options: Array<ILeague>;
    onChange: (league?: ILeague) => void;
}

export function LeagueSelect(props: ILeagueSelect) {
    const classes = useStyles();

    const onChange = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        const id = event.target.value as string;
        const foundLeague = props.options.find(l => l?._id === id);
        props.onChange(foundLeague);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id={`league-select-label`}>League</InputLabel>
            <Select
                labelId={`league-select-label`}
                id={'league-select'}
                value={props.value?._id ? props.value._id : ""}
                onChange={onChange}
            >
                {props.options.map((option: ILeague, index: number) => <MenuItem key={index} value={option?._id}>{option.Name}</MenuItem>)}
            </Select>
        </FormControl>
    );
}