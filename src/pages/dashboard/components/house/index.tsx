import React, { Component } from 'react';
import { IStore } from '../../../../store/models/types';
import { connect } from 'react-redux';
import { FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableHead,
    TableRow,
    TableCell,
    Button,
    TableBody,
    Modal,
    Fade,
    Input,
} from '@material-ui/core';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider,
  } from '@material-ui/pickers';
import BackendApi from '../../../../api';

interface IRoomState {
    Id: number;
    state: string;
}

  interface IRoom {
    id: number;
    Number: number;
    state: string;
    rRoomTypeID: number;
    PersonsAmount: number;
    Description: string;
    PricePerNight: number;
    stateId: number;
}

interface IState {
    rooms?: IRoom[];
    selectedRoom?: IRoom;
    roomError: boolean;
    errorDescription?: boolean;
    roomStateError?: boolean;
    roomDescription?: string;
    roomStates?: IRoomState[];
    roomStateId?: number;
}

interface IProps {
    history: any;
    userId: string;
}
class House extends Component<IProps, IState> {
    state: IState = {
        roomError: false,
        roomStateId: 0,
    }

    componentDidMount = async () => {
        const rooms = await BackendApi.getAllRooms({});
        this.setState({rooms});
    }

    onLogout = () => {
        this.props.history.push('/login');
    }

    onRoomSelected = async (selectedRoom: IRoom) => {
        if (!this.state.roomStates) {
            const res = await BackendApi.getRoomsStates({});
            console.log("House -> onRoomSelected -> res", res)
            if (res.originalError || res.error) {
                this.setState({roomStates: undefined});
            } else {
                this.setState({roomStates: res});
            }
        }
        this.setState({selectedRoom, roomStateId: selectedRoom.stateId, roomDescription: selectedRoom.Description, errorDescription: false, roomError: false});
    }

    handleClose = () => {
        this.setState({selectedRoom: undefined});
    }

    changeDescription = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({errorDescription: false, roomDescription: e.currentTarget.value, roomError: false});
    }

    onSave = async () => {
        console.log("House -> onSave -> this.state.roomDescription", this.state.roomDescription?.trim())
        if (!this.state.roomDescription?.trim()) {
            this.setState({errorDescription: true });
        } else if (!this.state.roomStateId) {
            this.setState({roomStateError: true });
        } else {
            const res = await BackendApi.updateRoom({Description: this.state.roomDescription, RoomStateId: this.state.roomStateId, id: this.state.selectedRoom?.id });
            console.log("House -> onRoomSelected -> res", res)
            if (!res || res.originalError || res.error) {
                this.setState({roomError: true });
            } else {
                this.setState({selectedRoom: undefined});
            }
        }
    }

    handleStateChange = async (event: any) => {
        if (event.target.value) {
            this.setState({roomStateId: event.target.value, roomStateError: false });
        }
    }

    render() {
        return (
            <div className="frontdesk-wrap">
                <div className="frontdesk-top">
                    <Button variant="contained" color='primary' onClick={this.onLogout}>
                        вийти
                    </Button>
                    <h1>Housemaid</h1>
                </div>
                {
                    this.state.rooms && <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ід кімнати</TableCell>
                            <TableCell align="right">ціна</TableCell>
                            <TableCell align="right">кількість осіб</TableCell>
                            <TableCell align="right">стан кімнати</TableCell>
                            <TableCell align="right">опис</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.rooms.map((row, rey) => (
                            <TableRow key={rey}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.PricePerNight}</TableCell>
                                <TableCell align="right">{row.PersonsAmount}</TableCell>
                                <TableCell align="right">{row.state}</TableCell>
                                <TableCell align="right">{row.Description}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color='primary' onClick={() => this.onRoomSelected(row)}>
                                        редагувати
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                }
                <Modal
                    className='frontdesk-modal'
                    open={!!this.state.selectedRoom}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Fade in={!!this.state.selectedRoom}>
                        <div className='frontdesk-modal-content'>
                            { this.state.roomError && <h3 className='frontdesk-modal-error'>при редаруванні інформації про кімнату сталась помилка. спробуйт ще раз</h3>}
                            <FormControl>
                                <InputLabel htmlFor="my-select">Статус кімнати</InputLabel>
                                <Select
                                    error={this.state.roomStateError}
                                    id="my-select"
                                    value={this.state.roomStateId}
                                    onChange={this.handleStateChange}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                {
                                    this.state.roomStates ? this.state.roomStates.map((p, key) => (
                                    <MenuItem key={key} value={p.Id}>{p.state}</MenuItem>
                                    )) : <MenuItem value={undefined}>no data</MenuItem>
                                }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="my-input">Опис</InputLabel>
                                <Input
                                    error={this.state.errorDescription}
                                    id="my-input"
                                    value={this.state.roomDescription}
                                    aria-describedby="my-helper-text"
                                    onChange={this.changeDescription}
                                />
                            </FormControl>
                            <div className="frontdesk-modal-btns">
                                <Button variant="contained" onClick={this.handleClose}>
                                    закрити
                                </Button>
                                <Button variant="contained" color='primary' onClick={this.onSave}>
                                    зберегти
                                </Button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>     
        )
    }
}


const mapStateToProps = (state: IStore) => ({
    userId: state.user.userId,
});
export default connect(mapStateToProps)(House);