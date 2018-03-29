import {service}  from "../../utilities";
import { ApiUrl } from "../../shared/constants";


export function testThreshold(threshold) {
    return service.axiosPost(
        ApiUrl.TEST_THRESHOLD, threshold
    )
}

