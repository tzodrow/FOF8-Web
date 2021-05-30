import './TableStyles.scss';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IDraftPlayer } from '../models/player';
import { avg } from '../calculations/average';
import { rowHighlightClass } from './RowHighlighter';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface IScoutingTable {
    players: Array<IDraftPlayer>;
}

export function KScoutingTable(props: IScoutingTable) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Overall</TableCell>
            <TableCell align="right">Kicking Accuracy</TableCell>
            <TableCell align="right">Kicking Power</TableCell>
            <TableCell align="right">Kickoff Distance</TableCell>
            <TableCell align="right">Kickoff Hangtime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players.map((player) => (
            <TableRow key={player.Player_ID}>
              <TableCell component="th" scope="row">
                {player.First_Name} {player.Last_Name}
              </TableCell>
              <TableCell align="right">{player.Overall_Projection_K?.toFixed(1)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Kicking_Accuracy, player.High_Kicking_Accuracy)}>{avg(player.Low_Kicking_Accuracy, player.High_Kicking_Accuracy)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Kicking_Power, player.High_Kicking_Power)}>{avg(player.Low_Kicking_Power, player.High_Kicking_Power)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Kickoff_Distance, player.High_Kickoff_Distance)}>{avg(player.Low_Kickoff_Distance, player.High_Kickoff_Distance)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Kickoff_Hang_Time, player.High_Kickoff_Hang_Time)}>{avg(player.Low_Kickoff_Hang_Time, player.High_Kickoff_Hang_Time)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
