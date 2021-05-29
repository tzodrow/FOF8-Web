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

export function DTScoutingTable(props: IScoutingTable) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Overall</TableCell>
            <TableCell align="right">Run Defense</TableCell>
            <TableCell align="right">Pass Rush Technique</TableCell>
            <TableCell align="right">Pass Rush Strength</TableCell>
            <TableCell align="right">Play Diagnosis</TableCell>
            <TableCell align="right">Punishing Hitter</TableCell>
            <TableCell align="right">Endurance</TableCell>
            <TableCell align="right">Special Teams</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players.map((player) => (
            <TableRow key={player.Player_ID}>
              <TableCell component="th" scope="row">
                {player.First_Name} {player.Last_Name}
              </TableCell>
              <TableCell align="right">{player.Overall_Projection_DT?.toFixed(1)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Run_Defense, player.High_Run_Defense)}>{avg(player.Low_Run_Defense, player.High_Run_Defense)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Pass_Rush_Technique, player.High_Pass_Rush_Technique)}>{avg(player.Low_Pass_Rush_Technique, player.High_Pass_Rush_Technique)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Pass_Rush_Strength, player.High_Pass_Rush_Strength)}>{avg(player.Low_Pass_Rush_Strength, player.High_Pass_Rush_Strength)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Play_Diagnosis, player.High_Play_Diagnosis)}>{avg(player.Low_Play_Diagnosis, player.High_Play_Diagnosis)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Punishing_Hitter, player.High_Punishing_Hitter)}>{avg(player.Low_Punishing_Hitter, player.High_Punishing_Hitter)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Endurance, player.High_Endurance)}>{avg(player.Low_Endurance, player.High_Endurance)}</TableCell>
              <TableCell align="right" className={rowHighlightClass(player.Low_Special_Teams, player.High_Special_Teams)}>{avg(player.Low_Special_Teams, player.High_Special_Teams)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
