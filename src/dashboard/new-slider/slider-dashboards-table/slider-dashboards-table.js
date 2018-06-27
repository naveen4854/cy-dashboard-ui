import React, { PureComponent } from 'react';


export default class MyDashboardTable extends PureComponent {
    constructor(props) {
        super(props);
    }

    viewSlider(id) {
        //TODO: To navigate the slider show
    }

    editSlider(id) {
        //TODO: need to navigate to slider edit page
    }

    // deleteSlider() {
    //   //  this.props.DeleteSlider(sliderId);
    // }

    // sortDashboard(sortColumn) {
    //     debugger;
    //     let sortOrder = 0;
    //     if (sortColumn == this.props.mySlider.sliderSortColumn) {
    //         sortOrder = this.props.mySlider.sliderSortOrder == SortOrderEnum.Ascending ? SortOrderEnum.Descending : SortOrderEnum.Ascending
    //     }
    //     else {
    //         sortOrder = SortOrderEnum.Ascending;
    //     }

    //     this.props.GetSortedSliderList(sortColumn, sortOrder);
    // }

    // showConfirmation(slider) {
    //     let notifyMessage = this.props.l.t('Are_you_sure_you_want_to_delete_$sliderName_slider', 'Are you sure you want to delete ${sliderName} slider?', { 'sliderName': slider.sliderName })
    //     let buttons = [
    //         {
    //             text: 'Yes',
    //             handler: () => this.deleteSlider(slider.sliderId)
    //         },
    //         {
    //             text: 'No',
    //             handler: () => { }
    //         }]

    //     this.props.common.confirm(notifyMessage, buttons);
    // }

    render() {

        // let sortIcon = '';
        // switch (this.props.mySlider.sliderSortOrder) {
        //     case SortOrderEnum.Ascending:
        //         sortIcon = 'fa fa-arrow-up';
        //         break;
        //     case SortOrderEnum.Descending:
        //         sortIcon = 'fa fa-arrow-down';
        //         break;
        //     default: sortIcon = 'fa fa-arrow-down';
        //         ;
        // }

        return (
            <div className="table-responsive">
                <table className="table my-files-table">
                    <colgroup>
                        <col span="1" className="icon" />
                        <col span="1" className="name" />
                        <col span="1" className="modifiedtime" />
                        <col span="1" className="live" />
                        <col span="1" className="edit" />
                        <col span="1" className="delete" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th><label className="text-primary pointer" > {<i aria-hidden="true"></i>} Dashboards in Slider</label></th>
                            <th><label className="text-primary pointer text-center">  <i aria-hidden="true"></i> Slide duration(sec)</label></th>
                            <th className="text-center"><label className="text-primary"> Live view</label></th>
                            <th className="text-center"><label className="text-primary"> Edit</label></th>
                            <th className="text-center"><label className="text-primary"> Remove</label></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // _.map(this.props.mySlider.userSliders, (slider, i) =>
                            //     <tr key={i}>
                            //         <td className={slider.IsOwner ? "" : "text-disabled"}>
                            //             <i className={slider.isOwner ? slider.isGlobal ? "fa fa-globe text-primary" : "fa fa-user text-primary" : "fa fa-globe"}></i>
                            //         </td>
                            //         <td>{slider.sliderName}</td>
                            //         <td className="text-center">{slider.modifiedDate}</td>
                            //         <td className="text-center">
                            //             <a className="pointer" onClick={() => this.viewDashboard(slider.sliderId)}>
                            //                 <i className="fa fa-desktop"></i>
                            //             </a>
                            //         </td>
                            //         <td className="text-center">
                            //             <a className={slider.isOwner ? "pointer" : "text-disabled"} disabled={!slider.isOwner} onClick={() => slider.isOwner ? this.editDashboard(slider.sliderId) : null}>
                            //                 <i className="fa fa-pencil"></i>
                            //             </a>
                            //         </td>
                            //         <td className="text-center">
                            //             <a className={slider.isOwner ? "pointer" : "text-disabled"} disabled={!slider.isOwner} onClick={() => slider.isOwner ? this.showConfirmation(slider) : null}>
                            //                 <i className="fa fa-trash"></i>
                            //             </a>
                            //         </td>
                            //     </tr>
                            //)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
