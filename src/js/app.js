;var app=(function(){
    /**
     * app's viewmodel class
     */
    class AppViewModel {
        constructor(props){
            const { locations=[],afterFilteredCallback,selectedCallback }=props; 

            //hide or open the side bar
            this.sideOpened=ko.observable(true);
            // the original array of locations
            this.allLocations=ko.observableArray(locations);
            this.text=ko.observable('');
            //filter's text
            this.filterText=ko.observable('');
            // compute the filtered locations
            this.filteredLocations=ko.computed(()=>{
                return this.allLocations().filter(item=>{
                    return item.title.toLowerCase().indexOf(this.filterText().toLowerCase())>=0
                });
            });

            // callback    
            this.afterFilteredCallback=afterFilteredCallback;
            this.selectedCallback=selectedCallback;
        }
    
        toggleHandler(){ 
            this.sideOpened(!this.sideOpened());
        }
    
        filterHandler(){
            this.filterText(this.text());
            this.afterFilteredCallback && this.afterFilteredCallback(this.filteredLocations());
        }

        selectHandler(location){  
            this.selectedCallback && this.selectedCallback(location);
        }
    } 

    return {
        AppViewModel
    }
})();
