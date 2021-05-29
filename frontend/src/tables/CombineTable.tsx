import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IDraftPlayer } from '../models/player';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface IDraftTableProps {
    players: Array<IDraftPlayer>;
}

export function CombineTable(props: IDraftTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Height</TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="right">Dash</TableCell>
            <TableCell align="right">Solecismic</TableCell>
            <TableCell align="right">Strength</TableCell>
            <TableCell align="right">Agility</TableCell>
            <TableCell align="right">Jump</TableCell>
            <TableCell align="right">Pos Spec</TableCell>
            <TableCell align="right">Developed</TableCell>
            <TableCell align="right">Grade</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players.map((player) => (
            <TableRow key={player.Player_ID}>
              <TableCell component="th" scope="row">
                {player.First_Name} {player.Last_Name}
              </TableCell>
              <TableCell align="right">{player.Position_Group}</TableCell>
              <TableCell align="right">{(player.Height / 12).toFixed(0)}-{player.Height % 12}</TableCell>
              <TableCell align="right">{player.Weight}</TableCell>
              <TableCell align="right">{(player.Dash / 100).toFixed(2)}</TableCell>
              <TableCell align="right">{player.Solecismic}</TableCell>
              <TableCell align="right">{player.Strength}</TableCell>
              <TableCell align="right">{(player.Agility / 100).toFixed(2)}</TableCell>
              <TableCell align="right">{(player.Jump / 12).toFixed(0)}-{player.Jump % 12}</TableCell>
              <TableCell align="right">{player.Position_Specific}</TableCell>
              <TableCell align="right">{player.Developed}%</TableCell>
              <TableCell align="right">{(player.Grade / 10).toFixed(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
