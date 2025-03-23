
import java.util.*;
class Solution {
    // Function is to check whether two strings are anagram of each other or not.
    public static boolean areAnagrams(String s1, String s2) {

        // Your code here
        if(s1.length()!=s2.length()){
            return false;
        }
        HashMap<Character,Integer> hm=new HashMap<>();
        for(int i=0;i<s1.length();i++){
            if(hm.containsKey(s1.charAt(i))){
                int val=hm.get(s1.charAt(i));
                hm.put(s1.charAt(i),val+1);
            }else{
                hm.put(s1.charAt(i),1);
            }
        }
        //System.out.println(hm);
        for(Map.Entry<Character,Integer> entry: hm.entrySet()){
            char ch=entry.getKey();
            int i=entry.getValue();
            System.out.println(ch+""+i);
        }
         HashMap<Character,Integer> hm1=new HashMap<>();
        for(int i=0;i<s2.length();i++){
            if(hm1.containsKey(s2.charAt(i))){
                int val=hm1.get(s2.charAt(i));
                hm1.put(s2.charAt(i),val+1);
            }else{
                hm1.put(s1.charAt(i),1);
            }
        }
        for(Map.Entry<Character,Integer> entry: hm1.entrySet()){
            char ch=entry.getKey();
            int i=entry.getValue();
            System.out.println(ch+""+i);
        }
         for(Map.Entry<Character,Integer> entry:hm.entrySet()){
            char ch=entry.getKey();
            if(!hm1.containsKey(ch)){
                System.out.println("shaheen");
                return false;
            }
            int val=entry.getValue();
            int count=hm1.get(ch);
            if(val!=count){
                return false;
            }
        }
        return true;
    }
}