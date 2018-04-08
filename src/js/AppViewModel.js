;var app=(function(){
    class AppViewModel {
        constructor(props){
            const { locations=[],afterFilteredCallback }=props; 

            this.sideOpened=ko.observable(true);
            this.allLocations=ko.observableArray(locations);
            this.text=ko.observable('');
            this.filterText=ko.observable('');

            this.filteredLocations=ko.computed(()=>{
                return this.allLocations().filter(item=>{
                    return item.title.toLowerCase().indexOf(this.filterText().toLowerCase())>=0
                });
            });

                
            this.afterFilteredCallback=afterFilteredCallback;
        }
    
        toggleHandler(){
            this.sideOpened(!this.sideOpened());
        }
    
        filter(){
            this.filterText(this.text());
            this.afterFilteredCallback && this.afterFilteredCallback(this.filteredLocations());
        }
    } 

    return {
        AppViewModel
    }
})();
