<script>
    import OmoSpin from "./../1-atoms/OmoSpin"
    import {onDestroy, onMount} from "svelte";

    let subscription = null;
    let currentStep;
    let log = "";

    onDestroy(() => {
        if (subscription) {
            subscription.unsubscribe();
        }
    });
    onMount(() => {
        let notifications = window.o.eventBroker.tryGetTopic("omo", "shell");
        subscription = notifications.observable.subscribe(next => {
            if (!next._$schemaId)
                return;

            switch (next._$schemaId) {
                case "events:omo.shell.log":
                    if (next.data.dataJson) {
                        log = log + new Date().toJSON() + " | " + next.data.severity + " | " + next.data.source + " | " + next.data.message + " | " + next.data.dataJson + "\n";
                    }
                    else {
                        log = log + new Date().toJSON() + " | " + next.data.severity + " | " + next.data.source + " | " + next.data.message + "\n";
                    }
                    break;
            }
        });
    });
</script>

<div>
    <OmoSpin/>
    <div class="title">{currentStep}</div>
    <div class="collapsible" style="overflow: auto">
    {log}
    </div>
</div>
