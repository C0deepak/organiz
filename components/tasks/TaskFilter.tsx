import { TaskFilterProps } from "@/types/task-interface"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "../ui/select"

export function TaskFilter({ filter, setFilter }: TaskFilterProps) {

    return (
        <Select
            value={filter}
            onValueChange={(e) => setFilter(e as "All" | "Complete" | "Incomplete")}
        >
            <SelectTrigger className="w-40 bg-background">
                <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Filter Task By Status</SelectLabel>
                    <SelectSeparator />
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Complete">Complete</SelectItem>
                    <SelectItem value="Incomplete">Incomplete</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
