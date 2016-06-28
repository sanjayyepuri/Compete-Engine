package sandbox;

import java.io.FilePermission;
import java.security.Permission;
import java.util.Arrays;
import java.util.PropertyPermission;

/**
 *
 * @author Nathan Dias {@literal <nathanxyzdias@gmail.com>}
 */
public class SandboxSecurityManager extends SecurityManager {

    {
        try {
            Class.forName("legit.moscow.sandbox.SandboxTask");

        } catch (Exception e) {
            System.out.print("");
        }
    }

    @Override
    public void checkPermission(Permission perm) {
//        System.err.println(Arrays.toString(Thread.currentThread().getStackTrace()));

        if (!(Thread.currentThread() instanceof SandboxTask)) {
            return;
        }
//        System.err.println(perm.getName());

        if (perm instanceof FilePermission) {
            FilePermission fp = (FilePermission) perm;
            if ((fp.getActions().equals("read"))) {
                return;
            }
        }
        if (perm instanceof PropertyPermission) {
            return;
        }
//        System.err.println(perm.toString());
        String trace = java.util.Arrays.toString(Thread.currentThread().getStackTrace());
//        System.err.println(trace);
        

        if (trace.contains("java.lang.invoke.InnerClassLambdaMetafactory")) {
            return;
        }
        
        if(trace.contains("java.text.NumberFormat.getInstance")){
            return;
        }

//        if (trace.contains("legit.moscow.compiler.UniqueThreadPrintStream")) {
//            return;
//        }
//        if(trace.contains("com.google.gson.internal.bind.ReflectiveTypeAdapterFactory.getBoundFields(")){
//            return;
//        }
//        UniqueThreadPrintStream.std.println(trace);
        throw new SecurityException(perm.toString());
    }

    @Override
    public void checkAccess(Thread t) {

        if (!(Thread.currentThread() instanceof SandboxTask)) {
            return;
        }

        throw new SecurityException(t + " tried to make a thread");

    }

}
