class Box extends React.Component {
    handleClick = (e) => {
        const boxClass = e.target.classList;
        
        const { index, update } = this.props;
        let { xround } = this.props;

        if (e.target.innerText.length == 0) xround = !xround;

        update(index, xround); // set the state arr value in parent Comp
    };

    render() {
        return (
            <div className="box" onClick={this.handleClick}>
                {this.props.value}
            </div>
        );
    }
}
