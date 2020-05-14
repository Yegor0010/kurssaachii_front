import React, { Component } from 'react'
import BackendApi from '../../../../api';
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
import "./styles.css";
import MaskedInput from 'react-text-mask';
import { IStore } from '../../../../store/models/types';
import { connect } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

function TextMaskCustom(props: any) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }

interface IBooking {
    Id: number;
    RoomId: number;
    RoomTypeId: number;
    bGuestId: number;
    bokkedBy: string;
    bookedDate: string;
    dateFrom: string;
    dateTo: string;
    personsCount: number;
    state: string;
}

interface IRoomType {
    Id: number;
    RoomType: string;
}
interface IRoom {
    id: number;
    Number: number;
    state: string;
    rRoomTypeID: number;
    PersonsAmount: number;
    Description: string;
    PricePerNight: number;
}

interface IState {
    rooms?: IRoom[];
    roomType: string;
    roomsTypes?: IRoomType[];
    selectedRoom?: IRoom;
    errorName: boolean;
    errorPhone: boolean;
    errorEmail: boolean;
    errorType: boolean;
    guestError: boolean;
    guestName: string;
    guestPhone: string;
    guestEmail: string;
    dateFrom: MaterialUiPickersDate;
    dateTo: MaterialUiPickersDate;
    viewBookings: boolean;
    bookings?: IBooking[];
    selectedBook?: IBooking;
}

interface IProps {
    history: any;
    userId: string;
}
class Frontdesk extends Component<IProps, IState> {

    state: IState = {
        roomType: '',
        roomsTypes: undefined,
        errorName: false,
        errorPhone: false,
        errorEmail: false,
        errorType: false,
        guestError: false,
        guestName: '',
        guestPhone: '',
        guestEmail: '',
        dateFrom: new Date('2020-08-18T21:11:54'),
        dateTo: new Date('2020-08-18T21:11:54'),
        viewBookings: false,
    }

    componentDidMount = async () => {
        const roomsTypes = await BackendApi.getRoomsTypes({});
        this.setState({roomsTypes});
    }

    handleChange = async (event: any) => {
        if (event.target.value) {
            const rooms = await BackendApi.getAvailableRooms({ RoomType: event.target.value });
            if (!rooms.originalError || !rooms.error) {
                this.setState({roomType: event.target.value, rooms });

            }
            console.log("Frontdesk -> handleChange -> rooms", rooms)
        }
    }

    onLogout = () => {
        this.props.history.push('/login');
    }
    onViewBookings = () => {
        this.setState((prevState: IState) => {
            if (!prevState.viewBookings) {
                this.getBookings();
            }
            return {viewBookings: !prevState.viewBookings};
        });
    }
    getBookings = async () =>{
        const res = await BackendApi.getBookings({});
        if (res.originalError || res.error) {
            this.setState({guestError: true});
        } else {
            this.setState({bookings: res});
        }
    }
    onRoomSelected = (selectedRoom: IRoom) => {
        this.setState({selectedRoom});
    }
    onBookSelected = (selectedBook: IBooking) => {
        this.setState({selectedBook});
    }

    changeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({errorName: false});
        this.setState({guestName: e.currentTarget.value});
    }
    changePhone = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({errorPhone: false});
        this.setState({guestPhone: e.currentTarget.value});
    }
    changeEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({errorEmail: false});
        this.setState({guestEmail: e.currentTarget.value});
    }
    handleDateChange = (date: MaterialUiPickersDate) => {
        console.log("Frontdesk -> handleDateChange -> date", date)
        this.setState({dateFrom: date});
    };
    handleDateToChange = (date: MaterialUiPickersDate) => {
        this.setState({dateTo: date});
    };
    onBook = async () => {
        const guestInfo = {
            ...this.state.selectedRoom,
            bokkedBy: this.props.userId,
            FullName: this.state.guestName,
            PhoneNumber: this.state.guestPhone,
            MailAddress: this.state.guestEmail,
            dateTo: this.state.dateTo,
            dateFrom: this.state.dateFrom,
            state: 'booked'
        }
        const res = await BackendApi.postBooking(guestInfo);
        if (res.originalError || res.error) {
            this.setState({guestError: true});
        } else {

        }
    }

    handleClose = () => {
        this.setState({selectedRoom: undefined, guestEmail: '', errorEmail: false, guestPhone: '', errorPhone: false, guestName: '', errorName: false});
    }
    handleCloseBook = () => {
        this.setState({selectedBook: undefined, guestEmail: '', errorEmail: false, guestPhone: '', errorPhone: false, guestName: '', errorName: false});
    }
    
    
    render() {
        if (this.state.viewBookings) {
            return (
                <div className="frontdesk-wrap">
                    <div className="frontdesk-top">
                        <Button variant="contained" color='primary' onClick={this.onLogout}>
                            вийти
                        </Button>
                        <Button className="frontdesk-view-booking-btn" variant="contained" color='primary' onClick={this.onViewBookings}>
                            назад до номерів
                        </Button>
                        <h1>Frontdesk</h1>
                    </div>
                    {
                    this.state.bookings && <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ід бронювання</TableCell>
                            <TableCell align="right">тип кімнати</TableCell>
                            <TableCell align="right">ід кімнати</TableCell>
                            <TableCell align="right">ід гостя</TableCell>
                            <TableCell align="right">ід фронтдеск</TableCell>
                            <TableCell align="right">дата бронювання</TableCell>
                            <TableCell align="right">дата поселення</TableCell>
                            <TableCell align="right">дата виселення</TableCell>
                            <TableCell align="right">кількість осіб</TableCell>
                            <TableCell align="right">статус</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.bookings.map((row, rey) => (
                            <TableRow key={rey}>
                                <TableCell component="th" scope="row">
                                    {row.Id}
                                </TableCell>
                                <TableCell align="right">{row.RoomId}</TableCell>
                                <TableCell align="right">{row.RoomTypeId}</TableCell>
                                <TableCell align="right">{row.bGuestId}</TableCell>
                                <TableCell align="right">{row.bokkedBy}</TableCell>
                                <TableCell align="right">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            disabled
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label=""
                                            value={row.bookedDate}
                                            onChange={() => {}}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </TableCell>
                                <TableCell align="right">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            disabled
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label=""
                                            value={row.dateFrom}
                                            onChange={() => {}}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </TableCell>
                                <TableCell align="right">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            disabled
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label=""
                                            value={row.dateTo}
                                            onChange={() => {}}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </TableCell>
                                <TableCell align="right">{row.personsCount}</TableCell>
                                <TableCell align="right">{row.state}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color='primary' onClick={() => this.onBookSelected(row)}>
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
                    open={!!this.state.selectedBook}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <Fade in={!!this.state.selectedBook}>
                        <div className='frontdesk-modal-content'>
                            { this.state.guestError && <h3 className='frontdesk-modal-error'>невірні дані гостя. Будь ласка, спробуйте ще раз</h3>}
                            <FormControl>
                                <InputLabel htmlFor="my-input">Ім'я гостя</InputLabel>
                                <Input
                                    error={this.state.errorName}
                                    id="my-input"
                                    aria-describedby="my-helper-text"
                                    onChange={this.changeName}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="my-input">номер телефону</InputLabel>
                                <Input
                                    error={this.state.errorName}
                                    id="my-input"
                                    aria-describedby="my-helper-text"
                                    onChange={this.changeName}
                                    inputComponent={TextMaskCustom}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="my-input">електронна адреса</InputLabel>
                                <Input
                                    error={this.state.errorName}
                                    id="my-input"
                                    aria-describedby="my-helper-text"
                                    onChange={this.changeName}
                                />
                            </FormControl>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Дата заселення"
                                    value={this.state.dateFrom}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Дата виселення"
                                    value={this.state.dateTo}
                                    onChange={this.handleDateToChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <div className="frontdesk-modal-btns">
                                <Button variant="contained" onClick={this.handleCloseBook}>
                                    закрити
                                </Button>
                                <Button variant="contained" color='primary' onClick={this.onBook}>
                                    зберегти
                                </Button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
                </div>
            );
        }
/*
--------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------
*/
        return (
            <div className="frontdesk-wrap">
                <div className="frontdesk-top">
                    <Button variant="contained" color='primary' onClick={this.onLogout}>
                        вийти
                    </Button>
                    <Button className="frontdesk-view-booking-btn" variant="contained" color='primary' onClick={this.onViewBookings}>
                        переглянути бронювання
                    </Button>
                    <h1>Frontdesk</h1>
                </div>
                <FormControl className="frontdesk-select">

                    <InputLabel htmlFor="my-select">Тип кімнати</InputLabel>
                    <Select
                        id="my-select"
                        value={this.state.roomType}
                        onChange={this.handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}
                        >
                    {
                        this.state.roomsTypes && this.state.roomsTypes.map((p, key) => (
                        <MenuItem key={key} value={p.Id}>{p.RoomType}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
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
                                        забронювати
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
                            { this.state.guestError && <h3 className='frontdesk-modal-error'>невірні дані гостя. Будь ласка, спробуйте ще раз</h3>}
                            <FormControl>
                                <InputLabel htmlFor="my-input">Ім'я гостя</InputLabel>
                                <Input
                                    error={this.state.errorName}
                                    id="my-input"
                                    aria-describedby="my-helper-text"
                                    onChange={this.changeName}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="my-input">номер телефону</InputLabel>
                                <Input
                                    error={this.state.errorName}
                                    id="my-input"
                                    aria-describedby="my-helper-text"
                                    onChange={this.changeName}
                                    inputComponent={TextMaskCustom}
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="my-input">електронна адреса</InputLabel>
                                <Input
                                    error={this.state.errorName}
                                    id="my-input"
                                    aria-describedby="my-helper-text"
                                    onChange={this.changeName}
                                />
                            </FormControl>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Дата заселення"
                                    value={this.state.dateFrom}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Дата виселення"
                                    value={this.state.dateTo}
                                    onChange={this.handleDateToChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <div className="frontdesk-modal-btns">
                                <Button variant="contained" onClick={this.handleClose}>
                                    закрити
                                </Button>
                                <Button variant="contained" color='primary' onClick={this.onBook}>
                                    забронювати
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


export default connect(mapStateToProps)(Frontdesk);