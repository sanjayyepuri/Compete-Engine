package sandbox;

/**
 *
 * @author Nathan Dias {@literal <nathanxyzdias@gmail.com>}
 */
public class SandboxEvent {
    
//    public final boolean error;
//    public final String output;
    final SandboxTask task;
    
    public SandboxEvent(SandboxTask task){
//        error = task.error;
//        output = task.out.toString();
        this.task=task;
    }
    
    public CompileResponse getResponse(){
        CompileResponse r = new CompileResponse();
        r.output=task.out.toString();
        r.error=task.error;
        r.id=task.id;
        return r;
    }
    
    
}
class CompileResponse{
    
    public String output;
    public boolean error;
    public int id;
    
}