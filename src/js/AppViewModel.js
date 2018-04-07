class AppViewModel {
    constructor(props){
        const { locations }=props; 
        this.sideOpened=ko.observable(true);
        this.allLocations=ko.observableArray(locations || []);
        this.filterText=ko.observable('');

        this.filteredLocations=ko.computed(()=>{
            return this.allLocations().filter(item=>{
                return item.title.toLowerCase().indexOf(this.filterText().toLowerCase())>=0
            });
        })
    }

    toggleHandler(){
        this.sideOpened(!this.sideOpened());
    }

    filter(){

    }
} 