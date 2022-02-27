// const gameContext = React.createContext(null);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.tempArr = new Array(9);
        this.tempArr.fill("");
        this.prev = false; // helps in updating prev state (helps of this remove some bugs in handlePrev function)

        this.state = {
            arr: this.tempArr,
            xround: true,
            win: false,
            prevMove: null,
        };
    }

    handleReset = () => {
        this.setState({
            arr: this.tempArr,
            xround: true,
            win: false,
            prevMove: null,
        });
    };

    handleUpdate = (ind, xround) => {
        if (this.state.win) return;
        this.prev = true;

        const tempSt = [...this.state.arr];

        // updating the tempSt array with X or O
        if (tempSt[ind].length == 0) {
            if (xround) tempSt[ind] = "O";
            else tempSt[ind] = "X";
        } else return; // if the box already have X or O

        // updating the state and just after every update check for the winner
        this.setState(
            (prevState) => {
                return {
                    arr: tempSt,
                    xround: xround,
                    prevMove: prevState.arr, // storing the previous state for moving  backward
                };
            },
            () => {
                const winner = this.checkResult(this.state.xround);
                if (winner) {
                    this.setState(
                        {
                            win: true,
                        },
                        () => alert(winner)
                    );
                }
            }
        );
    };

    // moving to previous move
    handlePrevMove = () => {
        let { xround } = this.state;
        if (this.prev) {
            xround = !xround;
            this.prev = false;
            this.setState({
                arr: this.state.prevMove,
                xround,
            });
        }
    };

    checkResult = (xround) => {
        const winner = xround ? "O win" : "X win";
        const { arr } = this.state;

        if (
            arr[0] &&
            ((arr[0] === arr[1] && arr[1] === arr[2]) ||
                (arr[0] === arr[4] && arr[4] === arr[8]) ||
                (arr[0] === arr[3] && arr[3] === arr[6]))
        ) {
            console.log("1", winner);
            return winner;
        }

        if (arr[1] && arr[1] === arr[4] && arr[4] === arr[7]) {
            console.log("2", winner);
            return winner;
        }

        if (
            arr[2] &&
            ((arr[2] === arr[5] && arr[5] === arr[8]) ||
                (arr[2] === arr[4] && arr[4] === arr[6]))
        ) {
            console.log("3", winner);
            return winner;
        }

        if (arr[3] && arr[3] === arr[4] && arr[4] === arr[5]) {
            console.log("4", winner);
            return winner;
        }
        if (arr[6] && arr[6] === arr[7] && arr[7] === arr[8]) {
            console.log("5", winner);
            return winner;
        }

        return 0;
    };

    render() {
        const { arr, xround } = this.state;
        const round = xround ? "X round" : "O Round";
        console.log(arr);
        return (
            <div className="game--container">
                <h2>Tic Tac Toe</h2>

                <div className="game--header">
                    <p>{round}</p>
                    <button onClick={this.handleReset}>Reset</button>
                    <button onClick={this.handlePrevMove}>Previous Move</button>
                </div>

                <div className="game--grid--container">
                    {arr.map((val, ind) => {
                        // <gameContext.provider value = {this.state}>
                        return (
                            <Box
                                value={val}
                                key={ind}
                                index={ind}
                                update={this.handleUpdate}
                                xround={xround}
                            />
                        );
                    })}
                    {/* </gameContext.provider> */}
                </div>
            </div>
        );
    }
}
