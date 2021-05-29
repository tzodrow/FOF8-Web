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

export function RBScoutingTable(props: IScoutingTable) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Overall</TableCell>
            <TableCell align="right">Breaking Speed</TableCell>
            <TableCell align="right">Power Inside</TableCell>
            <TableCell align="right">Third Down Running</TableCell>
            <TableCell align="right">Hole Recognition</TableCell>
            <TableCell align="right">Elusiveness</TableCell>
            <TableCell align="right">Speed Outside</TableCell>
            <TableCell align="right">Blitz Pickup</TableCell>
            <TableCell align="right">Avoid Drops</TableCell>
            <TableCell align="right">Get Downfield</TableCell>
            <TableCell align="right">Route Running</TableCell>
            <TableCell align="right">Third Down Receiving</TableCell>
            <TableCell align="right">Punt Returns</TableCell>
            <TableCell align="right">Kick Returns</TableCell>
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
              <TableCell align="right">{player.Overall_Projection_RB?.toFixed(1)}</TableCell>
              <TableCell align="right">{avg(player.Low_Speed, player.High_Speed)}</TableCell>
              <TableCell align="right">{avg(player.Low_Power_Inside, player.High_Power_Inside)}</TableCell>
              <TableCell align="right">{avg(player['Low_Third-Down_Runs'], player['High_Third-Down_Runs'])}</TableCell>
              <TableCell align="right">{avg(player.Low_Hole_Recognition, player.High_Hole_Recognition)}</TableCell>
              <TableCell align="right">{avg(player.Low_Elusiveness, player.High_Elusiveness)}</TableCell>
              <TableCell align="right">{avg(player.Low_Speed_Outside, player.High_Speed_Outside)}</TableCell>
              <TableCell align="right">{avg(player.Low_Blitz_Pickup, player.High_Blitz_Pickup)}</TableCell>
              <TableCell align="right">{avg(player.Low_Avoid_Drops, player.High_Avoid_Drops)}</TableCell>
              <TableCell align="right">{avg(player.Low_Get_Downfield, player.High_Get_Downfield)}</TableCell>
              <TableCell align="right">{avg(player.Low_Route_Running, player.High_Route_Running)}</TableCell>
              <TableCell align="right">{avg(player['Low_Third-Down_Receiving'], player['High_Third-Down_Receiving'])}</TableCell>
              <TableCell align="right">{avg(player.Low_Punt_Returns, player.High_Punt_Returns)}</TableCell>
              <TableCell align="right">{avg(player.Low_Kick_Returns, player.High_Kick_Returns)}</TableCell>
              <TableCell align="right">{avg(player.Low_Endurance, player.High_Endurance)}</TableCell>
              <TableCell align="right">{avg(player.Low_Special_Teams, player.High_Special_Teams)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
