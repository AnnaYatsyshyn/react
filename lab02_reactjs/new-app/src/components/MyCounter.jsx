// MyCounter.js

import React, { Component } from 'react';
import { Button, Typography, Box } from '@mui/material';

class MyCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.initialValue || 0,
            min: props.minValue || -10,
            max: props.maxValue || 10,
        };
    }

    handleIncrement = () => {
        this.setState((prevState) => {
            const { count, max } = prevState;
            if (count < max) {
                return { count: count + 1 };
            }
            return null;
        });
    };

    handleDecrement = () => {
        this.setState((prevState) => {
            const { count, min } = prevState;
            if (count > min) {
                return { count: count - 1 };
            }
            return null;
        });
    };

    handleReset = () => {
        this.setState({ count: this.props.initialValue || 0 });
    };

    render() {
        return (
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Counter Value: {this.state.count}
                </Typography>
                <Button variant="contained" color="primary" onClick={this.handleIncrement}>
                    +
                </Button>
                <Button variant="contained" color="secondary" onClick={this.handleDecrement}>
                    -
                </Button>
                <Button variant="outlined" color="primary" onClick={this.handleReset}>
                    Reset
                </Button>
            </Box>
        );
    }
}

export default MyCounter;
