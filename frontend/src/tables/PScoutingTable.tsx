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

export function PScoutingTable(props: IScoutingTable) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Overall</TableCell>
            <TableCell align="right">Punting Power</TableCell>
            <TableCell align="right">Hang Time</TableCell>
            <TableCell align="right">Directional Punting</TableCell>
            <TableCell align="right">Kick Holding</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players.map((player) => (
            <TableRow key={player.Player_ID}>
              <TableCell component="th" scope="row">
                {player.First_Name} {player.Last_Name}
              </TableCell>
              <TableCell align="right">{player.Overall_Projection_P?.toFixed(1)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Punting_Power, player.High_Punting_Power)}>{avg(player.Low_Punting_Power, player.High_Punting_Power)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Hang_Time, player.High_Hang_Time)}>{avg(player.Low_Hang_Time, player.High_Hang_Time)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Directional_Punting, player.High_Directional_Punting)}>{avg(player.Low_Directional_Punting, player.High_Directional_Punting)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Kick_Holding, player.High_Kick_Holding)}>{avg(player.Low_Kick_Holding, player.High_Kick_Holding)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
