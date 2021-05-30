import { FormControl, InputLabel, makeStyles, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

interface IFormSelectProps {
    id: string;
    label: string;
    value: string;
    options: Array<string>;
    onChange: (select: string) => void;
}

export function FormSelect(props: IFormSelectProps) {
    const classes = useStyles();

    const onChange = (event: React.ChangeEvent<{ name?: string, value: unknown }>) => {
        props.onChange(event.target.value as string);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
            <Select
                labelId={`${props.id}-label`}
                id={props.id}
                value={props.value ? props.value : ""}
                onChange={onChange}
            >
                {props.options.map((option: string, index: number) => <MenuItem key={index} value={option}>{option}</MenuItem>)}
            </Select>
        </FormControl>
    );
}