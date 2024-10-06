import authApiRequest from "@/apiRequests/auth"
import { useMutation } from "@tanstack/react-query"

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: authApiRequest.login
    })
}

export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: authApiRequest.logout
    })
}

export const useOutboundMutation = () => {
    return useMutation({
        mutationFn: authApiRequest.outbound
    })
}

