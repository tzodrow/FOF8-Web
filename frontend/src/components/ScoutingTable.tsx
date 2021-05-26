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

interface IScoutingTable {
    players: Array<IDraftPlayer>;
}

const avg = (...params: Array<number>) => {
    if (params.length === 0) return 0;
    const sum = params.reduce((a, b) => a + b);
    return sum / params.length;
}

export function ScoutingTable(props: IScoutingTable) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">ScnP</TableCell>
            <TableCell align="right">ShoP</TableCell>
            <TableCell align="right">MP</TableCell>
            <TableCell align="right">LP</TableCell>
            <TableCell align="right">DP</TableCell>
            <TableCell align="right">TDP</TableCell>
            <TableCell align="right">Acc</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">SR</TableCell>
            <TableCell align="right">RD</TableCell>
            <TableCell align="right">TMO</TableCell>
            <TableCell align="right">SF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.players.map((player) => (
            <TableRow key={player.Player_ID}>
              <TableCell component="th" scope="row">
                {player.First_Name} {player.Last_Name}
              </TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
