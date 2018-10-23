(function () {
    'use strict';
    class ReactRecordList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                records: []
            };

            getFACTFinder((factfinder) => {
                const {ResultDispatcher, FFCommunicationEventAggregator} = factfinder.communication;

                //set records manually the first time
                if (FFCommunicationEventAggregator.currentSearchResult) {
                    this.setRecords(FFCommunicationEventAggregator.currentSearchResult.records || []);
                }

                //get notified on each update from now on
                ResultDispatcher.subscribe("records", this.setRecords.bind(this));
            });
        }

        setRecords(records) {
            this.setState({
                records
            });
        }

        render() {
            return this.state.records.map((product) => {
                return React.createElement("div", {
                    key: product.id,
                    onClick: () => {
                        const trackingBehavior = factfinder.elements.trackingBehavior;
                        trackingBehavior._trackProductClick(void 0,  product, function () {
                            //tracking succeeded
                            window.location.href = `https://www.alpinetrek.co.uk${product.record.Deeplink}`;
                        });
                    }
                }, `Product id: ${product.id} - Click Me`);
            });
        }
    }

    ReactDOM.render(React.createElement(ReactRecordList), document.querySelector('#records_container'));
})();