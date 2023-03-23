

const LoginPage = () => {

    
    const url = "https://accounts.google.com/o/oauth2/v2/auth"
    const client_id = "422216780646-pgs3os1u4o3a0n6n7scp647v7bqibtrm.apps.googleusercontent.com"
    const redirect_URI = 'http://localhost:5173/callback'
    const scope = 'profile'
    const response_type = 'code'
    const fullUrl = `${url}?client_id=${client_id}&redirect_uri=${redirect_URI}&scope=${scope}&response_type=${response_type}&prompt=consent%20select_account`
    return ( 
        <>
            <h2>Login Page</h2>
            <a href={fullUrl}>Login with Google</a>
            
        </>
     );
}

export default LoginPage;
