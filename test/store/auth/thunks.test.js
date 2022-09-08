import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startCreatingUserWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { demoUser } from "../../helpers/fixtures/authFixtures";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { clearNoteLogout } from "../../../src/store/journal";

jest.mock('../../../src/firebase/providers')

describe('Pruebas en AuthThunks', () => {
    
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('debe invocar el checkingCredentials', async() => { 

        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )

     });


     ///startGoogleSignIn


     test('startGoogleSignIn debe llamar checkingCredentials y login con exito', async() => { 

        const loginData = { ok: true, ...demoUser };
        await singInWithGoogle.mockResolvedValue( loginData );

        //thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

      });

     test('startGoogleSignIn debe llamar checkingCredentials y logout con error', async() => { 

        const loginData = { ok: false, errorMessage: 'Un error de Google' };
        await singInWithGoogle.mockResolvedValue( loginData );

        //thunk
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

      });


      ////startCreatingUserWithEmailPassword


      test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y login con exito', async() => { 

        const loginData = {ok:true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName }
        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        //thunk
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( {uid: loginData.uid, photoURL: loginData.photoURL, email: loginData.email, displayName: loginData.displayName} ) );

      });


      test('startCreatingUserWithEmailPassword debe llamar checkingCredentials y logout con error', async() => { 

        const loginData = {ok:false, errorMessage:'Error de login' };
        const formData = { email: 'test', password: '123456', displayName: 'testname' }
        await registerUserWithEmailPassword.mockResolvedValue( loginData );

        //thunk
        await startCreatingUserWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( {errorMessage: loginData.errorMessage} ) );

      });


      ////startLoginWithEmailPassword


      test('startLoginWithEmailPassword debe llamar checkingCredentials y login con exito', async() => { 

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' }
        await loginWithEmailPassword.mockResolvedValue( loginData );

        //thunk
        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

      });

      test('startLoginWithEmailPassword debe llamar checkingCredentials y logout con error', async() => { 

        const loginData = { ok: false, errorMessage: 'Un error de login' };
        const formData = { email: 'test', password: '123456' }
        await loginWithEmailPassword.mockResolvedValue( loginData );

        //thunk
        await startLoginWithEmailPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData ) );

      });


      
      ///startLogout



      test('startLogout debe ejecutar el logout correctamente', async() => { 

        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNoteLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );


       })



});