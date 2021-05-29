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

export function CScoutingTable(props: IScoutingTable) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Overall</TableCell>
            <TableCell align="right">Run Blocking</TableCell>
            <TableCell align="right">Pass Blocking</TableCell>
            <TableCell align="right">Blocking Strength</TableCell>
            <TableCell align="right">Endurance</TableCell>
            <TableCell align="right">Long Snapping</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players.map((player) => (
            <TableRow key={player.Player_ID}>
              <TableCell component="th" scope="row">
                {player.First_Name} {player.Last_Name}
              </TableCell>
              <TableCell align="right">{player.Overall_Projection_C?.toFixed(1)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Run_Blocking, player.High_Run_Blocking)}>{avg(player.Low_Run_Blocking, player.High_Run_Blocking)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Pass_Blocking, player.High_Pass_Blocking)}>{avg(player.Low_Pass_Blocking, player.High_Pass_Blocking)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Blocking_Strength, player.High_Blocking_Strength)}>{avg(player.Low_Blocking_Strength, player.High_Blocking_Strength)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Endurance, player.High_Endurance)}>{avg(player.Low_Endurance, player.High_Endurance)}</TableCell>
              <TableCell align="right">{avg(player.Low_Long_Snapping, player.High_Long_Snapping)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
