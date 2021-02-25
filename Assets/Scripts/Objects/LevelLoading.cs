using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LevelLoading : MonoBehaviour
{
    public string nextLevel;

    private void OnTriggerEnter2D(Collider2D other) {
        // Fading
        if (other.gameObject.tag == "Player") {
            Player p = other.gameObject.GetComponent<Player>();
            p.dead = true;

            GameObject fadeObj = GameObject.Find("Fade");
            Fade fading = fadeObj.GetComponent<Fade>();
            fading.isFading = true;
        }
    }

    private void OnTriggerStay2D(Collider2D other) {
        // Load Next Level
        if (other.gameObject.tag == "Player") {
            GameObject fadeObj = GameObject.Find("Fade");
            Fade fading = fadeObj.GetComponent<Fade>();

            // Load Level
            if (fading.isFading == false)
            SceneManager.LoadScene(nextLevel);

            
        }
    }
}
