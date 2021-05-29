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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface IScoutingTable {
    players: Array<IDraftPlayer>;
}

export function QBScoutingTable(props: IScoutingTable) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Overall</TableCell>
            <TableCell align="right">Screen Passes</TableCell>
            <TableCell align="right">Short Passes</TableCell>
            <TableCell align="right">Medium Passes</TableCell>
            <TableCell align="right">Long Passes</TableCell>
            <TableCell align="right">Deep Passes</TableCell>
            <TableCell align="right">Third Down Passes</TableCell>
            <TableCell align="right">Accuracy</TableCell>
            <TableCell align="right">Timing</TableCell>
            <TableCell align="right">Sense Rush</TableCell>
            <TableCell align="right">Read Defense</TableCell>
            <TableCell align="right">Two Minutes Drill</TableCell>
            <TableCell align="right">Scramble Frequency</TableCell>
            <TableCell align="right">Kick Holding</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players.map((player) => (
            <TableRow key={player.Player_ID}>
              <TableCell component="th" scope="row">
                {player.First_Name} {player.Last_Name}
              </TableCell>
              <TableCell align="right">{player.Overall_Projection_QB?.toFixed(1)}</TableCell>
              <TableCell align="right">{avg(player.Low_Screen_Passes, player.High_Screen_Passes)}</TableCell>
              <TableCell align="right">{avg(player.Low_Short_Passes, player.High_Short_Passes)}</TableCell>
              <TableCell align="right">{avg(player.Low_Medium_Passes, player.High_Medium_Passes)}</TableCell>
              <TableCell align="right">{avg(player.Low_Long_Passes, player.High_Long_Passes)}</TableCell>
              <TableCell align="right">{avg(player.Low_Deep_Passes, player.High_Deep_Passes)}</TableCell>
              <TableCell align="right">{avg(player.Low_Third_Down, player.High_Third_Down)}</TableCell>
              <TableCell align="right">{avg(player.Low_Accuracy, player.High_Accuracy)}</TableCell>
              <TableCell align="right">{avg(player.Low_Timing, player.High_Timing)}</TableCell>
              <TableCell align="right">{avg(player.Low_Sense_Rush, player.High_Sense_Rush)}</TableCell>
              <TableCell align="right">{avg(player.Low_Read_Defense, player.High_Read_Defense)}</TableCell>
              <TableCell align="right">{avg(player['Low_Two-Minute_Offense'], player['High_Two-Minute_Offense'])}</TableCell>
              <TableCell align="right">{avg(player.Low_Run_Frequency, player.High_Run_Frequency)}</TableCell>
              <TableCell align="right">{avg(player.Low_Kick_Holding, player.High_Kick_Holding)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
